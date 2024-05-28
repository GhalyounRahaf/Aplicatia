# Create your views here.
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import Category, Book
from .serializers import CategorySerializer, BookSerializer, UpdateBookSerializer, GetBookSerializer
from django.shortcuts import get_object_or_404
import os

class CategoryViewSet(APIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BookViewSet(APIView):
    permission_classes = [IsAuthenticated]


    def post(self, request):    
        serialized_request = BookSerializer(data=request.data)
        print(serialized_request)
        if not serialized_request.is_valid(raise_exception=True):
            return Response(serialized_request.errors, status=status.HTTP_400_BAD_REQUEST)
        
        title = serialized_request.validated_data.get('title')
        author = serialized_request.validated_data.get('author')
        price = serialized_request.validated_data.get('price')
        description = serialized_request.validated_data.get('description')
        category = serialized_request.validated_data.get('category')
        photo = serialized_request.validated_data.get('photo')


        if len(photo) == 0:
            return Response(
                data={"detail": "Invalid Input"}, status=status.HTTP_400_BAD_REQUEST
        )

        book = Book()
        book.title = title
        book.author = author
        book.price = price
        book.description = description
        book.category = category
        book.photo = photo
        book.save()

        return Response(data={'detail': 'Book Added Successfully'}, status=status.HTTP_201_CREATED)

    def get(self, request):
        books = Book.objects.all()
        books_serialized = GetBookSerializer(books, many=True)
        return Response(data={'detail': 'Books retrieved successfully', 'data': {'books': books_serialized.data}}, status=status.HTTP_200_OK)


class BookRecommendation(APIView):
    def get(self, request, id):
        books = Book.objects.filter(category=id)
        books_serialized = BookSerializer(books, many=True)
        return Response(data={'detail': 'Books retrieved successfully', 'data': {'books': books_serialized.data}}, status=status.HTTP_200_OK)


class BookDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            book = Book.objects.get(id=id)
        except Book.DoesNotExist:
            return Response(data={'detail': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
        book_serialized = GetBookSerializer(book)
        return Response(data={'detail': 'Book retrieved successfully', 'data': {'book': book_serialized.data}}, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            book = Book.objects.get(id=id)
        except Book.DoesNotExist:
            return Response(data={'detail': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
        serialized_request = UpdateBookSerializer(data=request.data)
        if not serialized_request.is_valid():
            return Response(data={'detail':  JSONRenderer().render(serialized_request.errors)}, status=status.HTTP_400_BAD_REQUEST)
        
        book.title = serialized_request.validated_data.get('title') 
        book.author = serialized_request.validated_data.get('author') 
        book.description = serialized_request.validated_data.get('description') 
        book.price = serialized_request.validated_data.get('price') 
        book.category = serialized_request.validated_data.get('category') 
        photo = serialized_request.validated_data.get('photo') 
        if photo:
            old_file_path = book.photo.path
            book.photo = serialized_request.validated_data.get('photo')
            if os.path.isfile(old_file_path):
                os.remove(old_file_path)

        book.save()
        return Response(data={'detail': 'Book updated successfully'}, status=status.HTTP_200_OK)

    def delete(self, request, id):
        try:
            book = Book.objects.get(id=id)
        except Book.DoesNotExist:
            return Response(data={'detail': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
        book.delete()
        return Response(data={'detail': 'Book deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
