import os
import random
import string
import sys
import time

from abc import ABCMeta, abstractmethod

from fastapi import FastAPI, status, responses

from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster, ClusterOptions
from couchbase.collection import CBCollection
from couchbase.exceptions import AuthenticationException, BucketNotFoundException, DocumentNotFoundException,\
    InvalidArgumentException, DocumentExistsException, ValueFormatException, TimeoutException


class ICBConnection(metaclass=ABCMeta):

    @abstractmethod
    def get_default_collection(self, bucket_name: str):
        pass

    @staticmethod
    @abstractmethod
    def set_value(collection: CBCollection, key: str, value: str):
        pass

    @staticmethod
    @abstractmethod
    def get_value(collection: CBCollection, key: str):
        pass

    @staticmethod
    @abstractmethod
    def delete_value(collection: CBCollection, key: str):
        pass


class CBConnection(ICBConnection):
    __instance = None

    def __init__(self, connection_string: str, username: str, password: str):
        if CBConnection.__instance is not None:
            raise Exception('Singleton cannot be instantiated more than once')
        else:
            self.connection_string = connection_string
            self.username = username
            self.password = password
            CBConnection.__instance = Cluster(connection_string,
                                              ClusterOptions(PasswordAuthenticator(username, password)))

    def get_instance(self):
        if CBConnection.__instance is None:
            CBConnection(self.connection_string, self.username, self.password)
        return CBConnection.__instance

    def get_default_collection(self, bucket_name):
        return self.__instance.bucket(bucket_name).default_collection()

    @staticmethod
    def set_value(to_collection: CBCollection, key: str, value: str):
        try:
            return to_collection.insert(key=key, value=value)
        except (InvalidArgumentException, DocumentExistsException, ValueFormatException) as exception:
            raise exception

    @staticmethod
    def get_value(from_collection: CBCollection, key: str):
        try:
            return from_collection.get(key=key)
        except DocumentNotFoundException as exception:
            raise exception

    @staticmethod
    def delete_value(from_collection: CBCollection, key: str):
        try:
            return from_collection.remove(key)
        except DocumentNotFoundException as exception:
            raise exception


ms = FastAPI()

COUCHBASE_HOST = os.environ.get("COUCHBASE_HOST", "localhost")
COUCHBASE_USER = os.environ.get("COUCHBASE_USER", "Administrator")
COUCHBASE_PASSWORD = os.environ.get("COUCHBASE_PASSWORD", "password")
COUCHBASE_BUCKET = os.environ.get("COUCHBASE_BUCKET", "default")

try:
    cb_connection = CBConnection(f'couchbase://{COUCHBASE_HOST}', COUCHBASE_USER, COUCHBASE_PASSWORD)
    cb_collection = cb_connection.get_default_collection(bucket_name=COUCHBASE_BUCKET)
except (AuthenticationException, BucketNotFoundException, TimeoutException) as e:
    print(e.message)
    sys.exit(1)


@ms.get('/ms/secret/{key}', status_code=status.HTTP_200_OK)
def get_secret(key: str):
    try:
        result = cb_connection.get_value(from_collection=cb_collection, key=key)
        return responses.PlainTextResponse(result.content_as[str], status_code=status.HTTP_200_OK)
    except DocumentNotFoundException:
        time.sleep(3)
        _secret = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(32))
        cb_connection.set_value(to_collection=cb_collection, key=key, value=_secret)
        return responses.PlainTextResponse(_secret, status_code=status.HTTP_201_CREATED)


@ms.delete('/ms/secret/{key}')
def delete_secret(key: str):
    try:
        cb_connection.delete_value(from_collection=cb_collection, key=key)
        return responses.PlainTextResponse(status_code=status.HTTP_204_NO_CONTENT)
    except DocumentNotFoundException:
        return responses.PlainTextResponse(status_code=status.HTTP_404_NOT_FOUND)