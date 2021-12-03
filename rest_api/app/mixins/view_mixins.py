from rest_framework.reverse import reverse
from rest_framework.response import Response


class LinkedViewMixin:

    action = None
    basename = None
    lookup_field = 'pk'
    links = dict()

    def _append_all_link(self, request):
        self.links.update({
            'all': {
                'href': reverse(f'{self.basename}-list', request=request)
            }
        })

    def _append_self_link(self, request, pk):
        self.links.update({
            'self': {
                'href': reverse(f'{self.basename}-detail', request=request, kwargs={self.lookup_field: pk})
            }
        })

    def get_view_links(self, request, serializer):

        self.links.clear()
        self._append_all_link(request)

        if self.action in ['retrieve', 'create']:
            self._append_self_link(request, serializer.data.get('uuid'))

        return Response({
            'content': serializer.data,
            '_links': self.links
        })
