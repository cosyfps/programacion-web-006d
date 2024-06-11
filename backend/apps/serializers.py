from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    GeneroLibro,
    AutorLibro,
    AnioLibro,
    Libro,
    CarritoCompra,
    ItemCarrito,
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class GeneroLibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneroLibro
        fields = "__all__"


class AutorLibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = AutorLibro
        fields = "__all__"


class AnioLibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnioLibro
        fields = "__all__"


class LibroSerializer(serializers.ModelSerializer):
    generoLibro = GeneroLibroSerializer(read_only=True)
    autorLibro = AutorLibroSerializer(read_only=True)
    anioLibro = AnioLibroSerializer(read_only=True)

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
