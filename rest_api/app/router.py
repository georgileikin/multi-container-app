from rest_framework.routers import DefaultRouter

from .endpoints.items import ItemViewSet


routes = DefaultRouter()
routes.register('items', ItemViewSet)
