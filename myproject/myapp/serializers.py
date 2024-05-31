from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id','username','email','password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self,valited_data):
        user = User.objects.create_user(
            username=valited_data['username'],
            email=valited_data['email']
            password=valited_data['password']
        )
        return user
        