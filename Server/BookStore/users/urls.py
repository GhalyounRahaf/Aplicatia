from django.urls import path
from users.views import LoginView, SignupView, UsersView ,UsersDetailView

urlpatterns = [
    path('login', LoginView.as_view(), name="Login"),
    path('signup', SignupView.as_view(), name="SignUp"),
    # path('/logout', LogoutView.as_view(), name="Logout"),
    # path("/changePassword", ChangePasswordView.as_view(), name="Change Password"),
    path("<int:id>", UsersDetailView.as_view(), name="User Detail"),
]
