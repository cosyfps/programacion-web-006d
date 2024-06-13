from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.hashers import make_password
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin

from django.views import View
from django.views.generic import (
    CreateView,
    DeleteView,
    DetailView,
    ListView,
    UpdateView,
    TemplateView,
)

from .models import *
from .forms import LibroForm


# Create your views here.
def register(request):
    if request.method == "GET":
        return render(request, "register.html", {"form": UserCreationForm})
    else:

        if request.POST["registerPassword"] == request.POST["confirmPassword"]:
            try:
                user = User.objects.create_user(
                    username=request.POST["registerName"],
                    email=request.POST["registerEmail"],
                    password=request.POST["registerPassword"],
                )
                user.save()
                login(request, user)
                return redirect("home_page")

            except IntegrityError:
                return render(
                    request,
                    "register_error.html",
                    {"form": UserCreationForm, "error": "Username already exists."},
                )

        return render(
            request,
            "signup.html",
            {"form": UserCreationForm, "error": "Passwords did not match."},
        )


def signin_user(request):
    if request.method == "GET":
        form = AuthenticationForm()
        return render(request, "signin.html", {"form": form})
    elif request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect("home_page")
            else:
                error = "Username or password is incorrect."
        else:
            error = "Invalid form data. Please check your input."

        return render(request, "signin.html", {"form": form, "error": error})


@login_required
def administracion(request):
    return render(request, "admin/adminhome.html")


class LibroListView(LoginRequiredMixin, ListView):
    model = Libro
    template_name = "admin/libros_list.html"
    context_object_name = "libros"


class LibroCreateView(CreateView):
    model = Libro
    form_class = LibroForm
    template_name = "admin/libros_form.html"

    def form_valid(self, form):
        libro = form.save(commit=False)
        archivo_libro = self.request.FILES.get("archivoLibro")
        if archivo_libro:
            if archivo_libro.name and len(archivo_libro.name) > 100:
                archivo_libro.name = archivo_libro.name[:100]
            libro.archivoLibro = archivo_libro
        libro.save()
        return redirect("libros_list")


class LibroUpdateView(LoginRequiredMixin, UpdateView):
    model = Libro
    fields = [
        "tituloLibro",
        "generoLibro",
        "autorLibro",
        "anioLibro",
        "descripcionLibro",
        "portadaLibro",
        "precioLibro",
        "archivoLibro",
    ]
    template_name = "admin/libros_update.html"
    success_url = reverse_lazy("libros_list")


class LibroDeleteView(LoginRequiredMixin, DeleteView):
    model = Libro
    template_name = "admin/libros_confirm_delete.html"
    success_url = reverse_lazy("libros_list")


class UserListView(LoginRequiredMixin, ListView):
    model = User
    template_name = "admin/user_list.html"
    context_object_name = "users"


class UserCreateView(LoginRequiredMixin, CreateView):
    model = User
    fields = ["username", "email", "password", "is_superuser"]
    template_name = "admin/user_form.html"
    success_url = reverse_lazy("user_list")

    def form_valid(self, form):
        user = form.save(commit=False)
        password = form.cleaned_data["password"]
        user.set_password(password)
        user.save()
        return super().form_valid(form)


class UserUpdateView(LoginRequiredMixin, UpdateView):
    model = User
    fields = ["username", "email"]
    template_name = "admin/user_update.html"
    success_url = reverse_lazy("user_list")


class UserDeleteView(LoginRequiredMixin, DeleteView):
    model = User
    template_name = "admin/user_confirm_delete.html"
    success_url = reverse_lazy("user_list")


@login_required
def logout_view(request):
    logout(request)
    return redirect("home_page")


def home_page(request):
    return render(request, "home-page.html")


class catalogueListView(ListView):
    model = Libro
    template_name = "catalogue.html"
    context_object_name = "libros"


@login_required
def libro_detail(request, libro_id):
    libro = get_object_or_404(Libro, pk=libro_id)
    return render(request, "catalogue_detail.html", {"libro": libro})


# ! Configuracion Email

from django.core.mail import send_mail
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render


def contact(request):
    if request.method == "POST":
        email = request.POST.get("email")
        subject = "Recuperación Contraseña"
        email_content = f"Email: {email}\nSolicita recuperación de contraseña."

        send_mail(
            subject, email_content, email, ["kel.moreno@duocuc.cl"], fail_silently=False
        )

        return HttpResponseRedirect("/contact/enviado/")

    return render(request, "contact.html")


def contact_enviado(request):
    return render(request, "contact_enviado.html")


# -------------------------------------------------------------------------------


from django.shortcuts import render
from rest_framework import viewsets
from .models import (
    Libro,
    CarritoCompra,
    ItemCarrito,
)
from django.contrib.auth.models import User
from .serializers import (
    LibroSerializer,
    CarritoCompraSerializer,
    ItemCarritoSerializer,
)


class LibroViewSet(viewsets.ModelViewSet):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer


class CarritoCompraViewSet(viewsets.ModelViewSet):
    queryset = CarritoCompra.objects.all()
    serializer_class = CarritoCompraSerializer


class ItemCarritoViewSet(viewsets.ModelViewSet):
    queryset = ItemCarrito.objects.all()
    serializer_class = ItemCarritoSerializer
