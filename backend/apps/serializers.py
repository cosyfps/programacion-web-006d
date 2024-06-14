from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Libro,
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]


class LibroSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Libro
        fields = "__all__"


