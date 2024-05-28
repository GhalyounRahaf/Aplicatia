from django.db import models
from users.models import CustomUser
from books.models import Book

# Create your models here.

class Cart(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null = False)
    class Meta:
        # Specify the custom table name here
        db_table = 'cart'

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null= False)
    book = models.OneToOneField(Book, on_delete=models.CASCADE, null = False)
    quantity = models.IntegerField(null= False, default=1)

    class Meta:
        # Specify the custom table name here
        db_table = 'cartItem'
