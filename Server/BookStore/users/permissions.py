from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        print('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
        print(request.user)
        return request.user and request.user.is_authenticated and request.user.is_superuser
    
        # return request.user.type == 'ADMIN'
    