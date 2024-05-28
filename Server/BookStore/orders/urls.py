# users/urls.py
from django.urls import path
from .views import OrderView, OrderGetView

urlpatterns = [
    path('', OrderView.as_view(), name='orders'),
    path('get/', OrderGetView.as_view(), name='order_detail'),
    # path('order-items/', OrderItemView.as_view(), name='order_items'),
    # path('order-items/<int:id>/', OrderItemDetailView.as_view(), name='order_item_detail'),
]
