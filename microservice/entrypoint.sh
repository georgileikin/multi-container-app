#!/bin/sh

echo "Waiting for Couchbase"

while ! nc -z "$COUCHBASE_HOST" "$COUCHBASE_PORT"; do
  sleep 0.1
done

echo "Couchbase running..."

POOL="$(curl -u Administrator:password http://couchbase:8091/pools/default)"
UNKNOWN_POOL=\"unknown\ pool\"

if [ "$POOL" = "$UNKNOWN_POOL" ];then
  # Initialize Node
  curl -u Administrator:password -v -X POST \
    http://couchbase:8091/nodes/self/controller/settings \
    -d 'path=/opt/couchbase/var/lib/couchbase/data' \
    -d 'index_path=/opt/couchbase/var/lib/couchbase/data' \
    -d 'cbas_path=/opt/couchbase/var/lib/couchbase/data' \
    -d 'eventing_path=/opt/couchbase/var/lib/couchbase/data'

  # Rename Cluster
  curl -u Administrator:password -v -X POST http://couchbase:8091/node/controller/rename \
    -d 'hostname=couchbase'

  # Setup Services
  curl -u Administrator:password -v -X POST http://couchbase:8091/node/controller/setupServices \
    -d 'services=kv'

  # Setup Memory Quotas
  curl -u Administrator:password -v -X POST http://couchbase:8091/pools/default \
    -d 'memoryQuota=256' \
    -d 'indexMemoryQuota=256' \
    -d 'ftsMemoryQuota=256'

  # Setup Administrator username and password
  curl -u Administrator:password -v -X POST http://couchbase:8091/settings/web \
    -d 'password=password' \
    -d 'username=Administrator' \
    -d 'port=8091'

  # Setup Bucket
  curl -u Administrator:password -v -X POST http://couchbase:8091/pools/default/buckets \
    -d 'flushEnabled=1' \
    -d 'threadsNumber=3' \
    -d 'replicaIndex=0' \
    -d 'replicaNumber=0' \
    -d 'evictionPolicy=valueOnly' \
    -d 'ramQuotaMB=256' \
    -d 'bucketType=membase' \
    -d 'name=default'
fi

exec "$@"