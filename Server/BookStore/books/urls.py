from django.urls import path
from .views import BookViewSet, BookDetailView, BookRecommendation


urlpatterns = [
    path('', BookViewSet.as_view(), name='books'),
    path('recommendation/<int:id>', BookRecommendation.as_view(), name='books'),
    path('<int:id>', BookDetailView.as_view(), name='book_detail'),
]