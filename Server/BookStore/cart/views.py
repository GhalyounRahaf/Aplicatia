# carts/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Cart, CartItem
from books.models import Book
from .serializers import CartSerializer, CartItemSerializer, AddCartItemSerializer
from users.models import CustomUser

# Create your views here.
class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            idd = request.data['book_id']
            book = Book.objects.get(id=idd)
            cart = Cart.objects.get(user= request.user)
            cart_item = CartItem.objects.get(book= book, cart=cart)
        # except Exception as e:
        except Book.DoesNotExist:
            return Response(data={'detail': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
       
        cart_item.delete()
        return Response(data={'detail': 'Book removed from cart successfully'}, status=status.HTTP_200_OK)
    
    def get(self, request):
        user = CustomUser.objects.get(username=request.user)
        cart = user.cart
        cart_items = CartItem.objects.filter(cart=cart)

        serialized_data = CartItemSerializer(cart_items, many=True)
        return Response(data={'detail': 'Cart retrieved successfully', 'data': {'cart_items': serialized_data.data}}, status=status.HTTP_200_OK)


    def post(self, request):
        serialized_request = AddCartItemSerializer(data=request.data)

        if not serialized_request.is_valid():
            return Response(data={'detail': 'Data is not valid'}, status=status.HTTP_400_BAD_REQUEST)
        book_id = serialized_request.validated_data.get('book')
        quantity = serialized_request.validated_data.get('quantity')
        # quantity = 1


        user = CustomUser.objects.get(username=request.user)
        cart = user.cart
        cart_items = CartItem.objects.filter(cart=cart)
        cart_item = cart_items.filter(book_id=book_id).first()

        if cart_item:
            # If the product is already in the cart, increase the quantity
            qty = cart_item.quantity + quantity
            cart_item.quantity = qty
            cart_item.save()
        
        else:
            # If the product is not in the cart, add it
            book = Book.objects.get(pk=book_id)
            cart_item = CartItem.objects.create(cart=cart, book=book, quantity=quantity)

        return Response(data={'detail': 'Book added to the cart'}, status=status.HTTP_200_OK)







class CartDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            cart = Cart.objects.get(id=id)
        except Cart.DoesNotExist:
            return Response(data={'detail': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        cart_serialized = CartSerializer(cart)
        return Response(data={'detail': 'Cart retrieved successfully', 'data': {'cart': cart_serialized.data}}, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            cart = Cart.objects.get(id=id)
        except Cart.DoesNotExist:
            return Response(data={'detail': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        serialized_request = CartSerializer(cart, data=request.data)
        if not serialized_request.is_valid():
            return Response(data={'detail': 'Data is not valid'}, status=status.HTTP_400_BAD_REQUEST)
        serialized_request.save()
        return Response(data={'detail': 'Cart updated successfully'}, status=status.HTTP_200_OK)

    def delete(self, request, id):
        try:
            cart = Cart.objects.get(id=id)
        except Cart.DoesNotExist:
            return Response(data={'detail': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        cart.delete()
        return Response(data={'detail': 'Cart deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.all()
        cart_items_serialized = CartItemSerializer(cart_items, many=True)
        return Response(data={'detail': 'Cart items retrieved successfully', 'data': {'cart_items': cart_items_serialized.data}}, status=status.HTTP_200_OK)

    def post(self, request):
        serialized_request = CartItemSerializer(data=request.data)
        if not serialized_request.is_valid():
            return Response(data={'detail': 'Data is not valid'}, status=status.HTTP_400_BAD_REQUEST)
        serialized_request.save()
        return Response(data={'detail': 'Cart item created successfully'}, status=status.HTTP_201_CREATED)


    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            cart_item = CartItem.objects.get(id=id)
        except CartItem.DoesNotExist:
            return Response(data={'detail': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        cart_item_serialized = CartItemSerializer(cart_item)
        return Response(data={'detail': 'Cart item retrieved successfully', 'data': {'cart_item': cart_item_serialized.data}}, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            cart_item = CartItem.objects.get(id=id)
        except CartItem.DoesNotExist:
            return Response(data={'detail': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        serialized_request = CartItemSerializer(cart_item, data=request.data)
        if not serialized_request.is_valid():
            return Response(data={'detail': 'Data is not valid'}, status=status.HTTP_400_BAD_REQUEST)
        serialized_request.save()
        return Response(data={'detail': 'Cart item updated successfully'}, status=status.HTTP_200_OK)

    def delete(self, request, id):
        try:
            cart_item = CartItem.objects.get(id=id)
        except CartItem.DoesNotExist:
            return Response(data={'detail': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        cart_item.delete()
        return Response(data={'detail': 'Cart item deleted successfully'}, status=status.HTTP_204_NO_CONTENT)