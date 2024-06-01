from django.shortcuts import render
from rest_framework import viewsets
from .models import GeneroLibro, AutorLibro, AnioLibro, Libro, TipoUsuario, Usuario
from django.contrib.auth.models import User
from .serializers import (
    GeneroLibroSerializer,
    AutorLibroSerializer,
    AnioLibroSerializer,
    LibroSerializer,
    TipoUsuarioSerializer,
    UsuarioSerializer,
)

# Create your views here.


# Create your views here.
class GeneroLibroViewSet(viewsets.ModelViewSet):
    queryset = GeneroLibro.objects.all()
    serializer_class = GeneroLibroSerializer


class AutorLibroViewSet(viewsets.ModelViewSet):
    queryset = AutorLibro.objects.all()
    serializer_class = AutorLibroSerializer


class AnioLibroViewSet(viewsets.ModelViewSet):
    queryset = AnioLibro.objects.all()
    serializer_class = AnioLibroSerializer


class LibroViewSet(viewsets.ModelViewSet):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer


class TipoUsuarioViewSet(viewsets.ModelViewSet):
    queryset = TipoUsuario.objects.all()
    serializer_class = TipoUsuarioSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

