# carts/serializers.py
from rest_framework import serializers
from .models import Cart, CartItem
from books.serializers import BookSerializer

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'user']

class CartItemSerializer(serializers.ModelSerializer):

    id = serializers.CharField(required=False)
    cart = serializers.CharField(required=False)
    book = serializers.CharField(required=True)
    quantity = serializers.IntegerField(required=True)
    book = BookSerializer(book)  # Nested serializer for Book object
    class Meta:
        model = CartItem
        fields = ['id','cart','book', 'quantity']

class AddCartItemSerializer(serializers.ModelSerializer):

    id = serializers.CharField(required=False)
    cart = serializers.CharField(required=False)
    book = serializers.CharField(required=True)
    quantity = serializers.IntegerField(required=True)
    class Meta:
        model = CartItem
        fields = ['id','cart','book', 'quantity']
