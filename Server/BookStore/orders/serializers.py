# users/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem
from users.models import CustomUser
from books.models import Book
from books.serializers import BookSerializer

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'total']

class OrderItemSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)  # Use the nested CategorySerializer
    class Meta:
        model = OrderItem
        fields = ['id', 'book', 'order', 'quantity']
