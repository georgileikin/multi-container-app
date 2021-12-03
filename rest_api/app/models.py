from django.db import models

import uuid

# Create your models here.


class Item(models.Model):

    uuid = models.UUIDField(primary_key=True,
                            editable=False,
                            unique=True,
                            default=uuid.uuid4)

    name = models.CharField(max_length=128)
    description = models.TextField()

    def __str__(self):
        return '{}: {}'.format(self.uuid, self.name)

