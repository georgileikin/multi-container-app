import requests

from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import ModelSerializer, SerializerMethodField, HyperlinkedIdentityField, \
    HyperlinkedModelSerializer
from rest_framework.viewsets import ModelViewSet

from ..mixins.view_mixins import LinkedViewMixin

from ..models import Item

HOST = settings.BACKEND_SERVICE.get('HOST')
PORT = settings.BACKEND_SERVICE.get('PORT')


def get_microservice_url():
    return f'http://{HOST}:{PORT}/ms/secret'


class ItemListSerializer(HyperlinkedModelSerializer):

    href = HyperlinkedIdentityField('item-detail')

    class Meta:
        model = Item
        fields = ('uuid', 'href', 'name', 'description', )


class ItemSerializer(ModelSerializer):

    secret = SerializerMethodField()

    class Meta:
        model = Item
        fields = ('uuid', 'name', 'description', 'secret', )

    @staticmethod
    def get_secret(instance):
        return requests.get(f'{get_microservice_url()}/{instance.uuid}').text


class ItemViewSet(LinkedViewMixin, ModelViewSet):

    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        serializer = ItemListSerializer(self.get_queryset(), many=True, context={'request': request})
        return self.get_view_links(request, serializer)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = ItemSerializer(instance)
        return self.get_view_links(request, serializer)

    def create(self, request, *args, **kwargs):
        serializer = ItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return self.get_view_links(request, serializer)

    def destroy(self, request, *args, **kwargs):
        requests.delete(f'{get_microservice_url()}/{kwargs.get("pk")}')
        return super().destroy(request, *args, **kwargs)




