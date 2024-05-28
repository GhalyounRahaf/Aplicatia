from django.urls import path
from .views import CartView

urlpatterns = [
    path('', CartView.as_view(), name='carts'),
    # path('<int:id>', CartDetailView.as_view(), name='cart_detail'),
    # path('cart-items/', CartItemView.as_view(), name='cart_items'),
    # path('cart-items/<int:id>/', CartItemDetailView.as_view(), name='cart_item_detail'),
]