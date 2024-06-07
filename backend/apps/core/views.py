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


from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.views.generic import CreateView, DeleteView, ListView, UpdateView
from .forms import LibroForm, UsuarioForm
from .models import Libro, Usuario


# Main page
class AdminView(LoginRequiredMixin, View):
    def get(self, request):
        template = "backend/apps/core/templates/core/admin/adminhome.html"
        return render(request, template)


# Create Models (form)
class LibroCreateView(LoginRequiredMixin, CreateView):
    model = Libro
    form_class = LibroForm
    template_name = "backend/apps/core/templates/core/admin/libro_form.html"
    success_url = "list"


class UsuarioCreateView(LoginRequiredMixin, CreateView):
    model = Usuario
    form_class = UsuarioForm
    template_name = "backend/apps/core/templates/core/admin/usuarios_form.html"
    success_url = "list"


# Read Models (list)
class LibroListView(LoginRequiredMixin, ListView):
    model = Libro
    template_name = "backend/apps/core/templates/core/admin/adminhome.html"


class UsuarioListView(LoginRequiredMixin, ListView):
    model = Usuario
    template_name = "backend/apps/core/templates/core/admin/userlist.html"


# Update Models (Update)
class LibroUpdateView(LoginRequiredMixin, UpdateView):
    model = Libro
    form_class = LibroForm
    template_name = "backend/apps/core/templates/core/admin/libro_form.html"
    success_url = "list"


class UsuarioUpdateView(LoginRequiredMixin, UpdateView):
    model = Usuario
    form_class = UsuarioForm
    template_name = "backend/apps/core/templates/core/admin/usuarios_form.html"
    success_url = "list"


# Delete Models (Delete)
class LibroDeleteView(LoginRequiredMixin, DeleteView):
    model = Libro
    template_name = "backend/apps/core/templates/core/admin/libro_delete.html"
    success_url = "list"


class UsuarioDeleteView(LoginRequiredMixin, DeleteView):
    model = Usuario
    template_name = "backend/apps/core/templates/core/admin/usuarios_delete.html"
    success_url = "list"


# Custom Login
from django.contrib.auth.views import LoginView

# class CustomLoginView(LoginView):
#     authentication_form = CustomAuthenticationForm
#     template_name = "frontend/templates/signin2.html"


# # Registration view
# def register(request):
#     if request.method == "POST":
#         form = CustomUserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect("login")
#     else:
#         form = CustomUserCreationForm()
#     return render(request, "frontend/templates/signin2.html", {"form": form})


# FIXME: Email Configuration
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponse


def visitas(request):
    if request.method == "POST":
        message = request.POST["message"]
        email = request.POST["email"]
        name = request.POST["name"]

        default_message = f"Correo: {email}\n\n{message}"

        send_mail(
            name,
            default_message,
            email,
            ["kelvin.morenog28@gmail.com"],
            fail_silently=False,
        )

    return render(request, "core/visitas.html")
