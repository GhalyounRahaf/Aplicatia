from django.db import models
from users.models import CustomUser
from books.models import Book
from django.utils import timezone

# Create your models here.


class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null= True)
    total = models.FloatField(null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    class Meta:
        # Specify the custom table name here
        db_table = 'order'

class OrderItem(models.Model):
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False)
    quantity = models.IntegerField(default=1)
    class Meta:
        # Specify the custom table name here
        db_table = 'orderItem'