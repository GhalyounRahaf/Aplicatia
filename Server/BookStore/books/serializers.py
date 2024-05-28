from rest_framework import serializers
from .models import Category, Book

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title','author', 'price', 'description', 'category', 'photo']

class GetBookSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)  # Use the nested CategorySerializer

    class Meta:
        model = Book
        fields = ['id', 'title','author', 'price', 'description', 'category', 'photo']


class UpdateBookSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=True)
    author = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    price = serializers.CharField(required=True)
    photo = serializers.ImageField(required=False, allow_null=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=True)
    class Meta:
        model = Book
        fields = ['id', 'title', 'author','price', 'description', 'category', 'photo']
