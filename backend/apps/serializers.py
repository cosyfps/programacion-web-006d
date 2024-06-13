from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Libro,
    CarritoCompra,
    ItemCarrito,
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]


class LibroSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Libro
        fields = "__all__"


class ItemCarritoSerializer(serializers.ModelSerializer):
    libro = LibroSerializer(read_only=True)

    class Meta:
        model = ItemCarrito
        fields = ["id", "libro", "cantidad", "total_precio"]


class CarritoCompraSerializer(serializers.ModelSerializer):
    items = ItemCarritoSerializer(many=True, read_only=True)

    class Meta:
        model = CarritoCompra
        fields = ["id", "user", "items"]
