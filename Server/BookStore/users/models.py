from django.db import models
from django.utils import timezone

from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    address = models.CharField(max_length=200, blank=False, null=False)
    phone = models.CharField(max_length=15, blank=False, null=False)
    class Meta:
        # Specify the custom table name here
        db_table = 'users'
        