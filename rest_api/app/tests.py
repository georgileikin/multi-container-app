from django.urls import reverse
from rest_framework import status, test

# Create your tests here.


class ItemTestCase(test.APITestCase):

    def test_get_all_items(self):
        response = self.client.get(reverse('item-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
