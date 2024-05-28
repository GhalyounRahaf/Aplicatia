from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from datetime import datetime

from users.serializers import UserSerializer, LoginSerializer, NewUserSerializer, UpdateUserSerializer, ChangePasswordSerializer
from users.models import CustomUser
from cart.models import Cart
from users.permissions import IsAdmin

# Create your views here.
class UsersView(APIView):
    
    # permission_classes = [IsAuthenticated & IsAdmin]
    permission_classes = [IsAuthenticated & IsAdmin]
    def get(self, request):

        users = CustomUser.objects.all()
        users_serialized = UserSerializer(users, many=True)
        return Response(data={'detail': 'Users retrieved successfully', 'data': { 'users': users_serialized.data }}, status=status.HTTP_200_OK)


class UsersDetailView(APIView):

    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        try:
            username = request.user
            user = CustomUser.objects.get(username=username)
            serialized_user = UserSerializer(user).data
            return Response({"user": serialized_user}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        print("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        serialized_request = UpdateUserSerializer(data=request.data)
        if not serialized_request.is_valid():
            return Response(data={'detail': 'Error In Data'}, status=status.HTTP_400_BAD_REQUEST)

        new_password = serialized_request.validated_data.get('new_password', None)

        try:
            user = CustomUser.objects.get(username=request.user)
        except CustomUser.DoesNotExist:
            return Response(data={'detail': 'User not Found'}, status=status.HTTP_404_NOT_FOUND)

        if new_password is not None:
            user.set_password(new_password)

        email = serialized_request.validated_data.get('email')
        phone = serialized_request.validated_data.get('phone')
        address = serialized_request.validated_data.get('address')
        first_name = serialized_request.validated_data.get('first_name')
        last_name = serialized_request.validated_data.get('first_name')

        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.phone = phone
        user.address = address
        user.save()
        return Response(data={'detail': 'User Updated Successfully', }, status=status.HTTP_200_OK)


class SignupView(APIView):

    def post(self, request):
        print(request.body)
        serialized_request = NewUserSerializer(data=request.data)
        if not serialized_request.is_valid():
            return Response(data={'detail': 'data is not valid'}, status=status.HTTP_400_BAD_REQUEST)
        username = serialized_request.validated_data.get('username')
        password = serialized_request.validated_data.get('password')
        confirm_password = request.data.get('confirmPassword')
        email = serialized_request.validated_data.get('email')
        address = serialized_request.validated_data.get('address')
        first_name = serialized_request.validated_data.get('first_name')
        last_name = serialized_request.validated_data.get('last_name')

        if password != confirm_password:
            return Response(data={'detail': "password doesn't match"}, status=status.HTTP_400_BAD_REQUEST)


        try:
            CustomUser.objects.get(username=username)
            return Response(data={'detail': 'User Already Exist'}, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            pass

        user = CustomUser()
        user.username = username
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.Address = address
        user.set_password(password)
        user.save()
        cart = Cart()
        cart.user_id = user.id
        cart.save()
        return Response(data={'detail': 'user created successfully'}, status=status.HTTP_200_OK)


class LoginView(APIView):
    print('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
    def post(self, request):
        print(request.data)
        serialized_request = LoginSerializer(data=request.data)
        if not serialized_request.is_valid():
            return Response(data={'detail': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        
        username = serialized_request.validated_data.get('username')
        password = serialized_request.validated_data.get('password')


        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response(data={'detail': 'User is not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.check_password(password):
            return Response(data={'detail': 'password is not correct'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            token = Token.objects.get(user=user)
        except Token.DoesNotExist:
            token = Token.objects.create(user=user) 

        user.last_login = datetime.now()
        user.save()
        user_data = UserSerializer(user).data
        user_data.is_superuser = user.is_superuser
        return Response(data={'detail': 'user logged in successfully', 'data': {'data': user_data , 'isAdmin': user.is_superuser, 'token': token.key}}, status=status.HTTP_200_OK)

# class UserChangePasswordView(APIView):

#     permission_classes = [IsAuthenticated]
#     def put(self, request):
#         serialized_request = ChangePasswordSerializer(data=request.data)
#         if not serialized_request.is_valid():
#             return Response(data={'detail': 'البيانات غير صالحة'}, status=status.HTTP_400_BAD_REQUEST)

#         old_password = serialized_request.validated_data.get('old_password')
#         new_password = serialized_request.validated_data.get('new_password')
#         confirm_password = serialized_request.validated_data.get('confirm_password')
        
#         if not request.user.check_password(old_password):
#             return Response(data={'detail': 'كلمة المرور غير صحيحة'}, status=status.HTTP_400_BAD_REQUEST)

#         if len(new_password) < 12:
#             return Response(data={'detail': 'يجب ادخال كلمه سر اكثر من 11 حرف'}, status=status.HTTP_400_BAD_REQUEST)

#         if new_password != confirm_password:
#             return Response(data={'detail': 'كلمة المرور غير متاطبقة'}, status=status.HTTP_400_BAD_REQUEST)

#         request.user.set_password(new_password)
#         request.user.save()
#         return Response(data={'detail': 'تم تعديل كلمة السر بنجاح', }, status=status.HTTP_200_OK)
