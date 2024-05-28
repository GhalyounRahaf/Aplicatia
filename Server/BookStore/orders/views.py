# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.utils.dateparse import parse_datetime
from django.utils import timezone
from cart.serializers import CartSerializer, CartItemSerializer, AddCartItemSerializer

from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from users.models import CustomUser
from users.permissions import IsAdmin

class OrderView(APIView):
    
    permission_classes = [IsAuthenticated]


    def post(self, request):
        try:
            # Get the user's cart
            cart = request.user.cart
            print(cart)
            # Get all products in the cart
            cart_items = cart.cartitem_set.all().select_related('book')
            serialized_data = CartItemSerializer(cart_items, many=True).data
            # Calculate the total price
            total_price = 0
            print(serialized_data)
            for item in serialized_data:
                book_price = float(item['book']['price'])
                print(book_price)
                quantity = int(item['quantity'])
                print(quantity)
                item_total = book_price * quantity
                total_price += item_total

            if not cart_items:
                return Response({'detail': 'Cart is Empty'}, status=status.HTTP_400_BAD_REQUEST)

            # Create a new order for the user
            order_serializer = OrderSerializer(data={'user': request.user.id, 'total':total_price})
            if order_serializer.is_valid():
                order = order_serializer.save()
                
                # Add products to the order
                for cart_item in cart_items:
                    order.orderitem_set.create(
                        book=cart_item.book,
                        quantity=cart_item.quantity
                    )
                
                # Clear the cart
                cart.cartitem_set.all().delete()
                
                # Return success response
                return Response({'detail': 'Order created successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class OrderGetView(APIView):
    
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)
        try:
            start = request.data['start']
            end = request.data['end']
            if start and end:
                start_date = parse_datetime(start)
                end_date = parse_datetime(end)
                # Ensure the dates are timezone aware
                if timezone.is_naive(start_date):
                    start_date = timezone.make_aware(start_date, timezone.get_current_timezone())
                if timezone.is_naive(end_date):
                    end_date = timezone.make_aware(end_date, timezone.get_current_timezone())
                
            

            if request.user.is_superuser:
                if start and end:
                    orders = Order.objects.filter(created_at__gte=start_date, created_at__lte=end_date)
                else:
                    orders = Order.objects.all()

                print('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                orders_serialized = OrderSerializer(orders, many=True)
                # orders_serialized = OrderSerializer(orders, many=True).data

                # Populate order items for each order
                for order in orders_serialized.data:
                    order_items = OrderItem.objects.filter(order=order['id']).select_related('book')
                    order_items_serialized = OrderItemSerializer(order_items, many=True).data
                    order['order_items'] = order_items_serialized
                # Update the serializer data with modified order items
                # orders_serialized.data = list(orders_serialized.data)  # Convert to list to make it mutable
                
                return Response(data={'detail': 'Orders retrieved successfully', 'data': {'orders': orders_serialized.data}}, status=status.HTTP_200_OK)
            else :
                user = CustomUser.objects.get(username=request.user)
                if start and end:
                    orders = Order.objects.filter(user=user.id, created_at__gte=start_date, created_at__lte=end_date)
                else:
                    orders = Order.objects.filter(user=user.id)

                orders_serialized = OrderSerializer(orders, many=True)
                # Populate order items for each order
                for order in orders_serialized.data:
                    order_items = OrderItem.objects.filter(order=order['id']).select_related('book')
                    order_items_serialized = OrderItemSerializer(order_items, many=True).data
                    order['order_items'] = order_items_serialized

                    
                # # Query order items related to the given order
                # order_items = OrderItem.objects.filter(order_id=order_id).select_related('book')
                
                # # Serialize order items along with populated book details
                # order_items_serializer = OrderItemSerializer(order_items, many=True)
                

                return Response(data={'detail': 'Orders retrieved successfully', 'data': {'orders': orders_serialized.data}}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(data={'detail': 'Orders retrieved successfully', 'data': {'orders': orders_serialized.data}}, status=status.HTTP_200_OK)
