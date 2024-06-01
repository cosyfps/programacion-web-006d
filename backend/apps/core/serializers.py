from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GeneroLibro, AutorLibro, AnioLibro, Libro, TipoUsuario, Usuario


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
    class Meta:
        model = Libro
        fields = "__all__"


class TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoUsuario
        fields = "__all__"


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"
