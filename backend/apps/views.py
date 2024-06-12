from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.utils import timezone
from django.contrib.auth.decorators import login_required

# Create your views here.
def register(request):
    if request.method == "GET":
        return render(request, "register.html", {"form": UserCreationForm})
    else:

        if request.POST["registerPassword"] == request.POST["confirmPassword"]:
            try:
                user = User.objects.create_user(request.POST["registerEmail"], password=request.POST["registerPassword"])
                user.save()
                login(request, user)
                return redirect("home_page")
            
            except IntegrityError:
                return render(request, "register.html",
                    {"form": UserCreationForm, "error": "Username already exists."},)

        return render(request, "signup.html", {"form": UserCreationForm, "error": "Passwords did not match."},)


def signin_user(request):
    if request.method == 'GET':
        form = AuthenticationForm()
        return render(request, 'signin.html', {"form": form})
    elif request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home_page')
            else:
                error = "Username or password is incorrect."
        else:
            error = "Invalid form data. Please check your input."
        
        return render(request, 'signin.html', {"form": form, "error": error})

@login_required
def logout_view(request):
    logout(request)
    return redirect('home_page')

def home_page(request):
    return render(request, "home-page.html")


def catalogue(request):
    return render(request, "catalogue.html")


# ! Configuracion Email

from django.core.mail import send_mail
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.shortcuts import render

def contact(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        email_content = f"Email: {email}\nMensaje: {message}"
        
        send_mail('Asunto del mensaje', email_content, email, ['kelvin.morenog28@gmail.com'], fail_silently=False)
        
        # return HttpResponseRedirect('url')  # Cambia '/url/' por la URL que desees
        return HttpResponse("Mensaje enviado correctamente") 
        
    return render(request, "contact.html")


# -------------------------------------------------------------------------------


from django.shortcuts import render
from rest_framework import viewsets
from .models import GeneroLibro, AutorLibro, AnioLibro, Libro, CarritoCompra, ItemCarrito
from django.contrib.auth.models import User
from .serializers import (
    GeneroLibroSerializer,
    AutorLibroSerializer,
    AnioLibroSerializer,
    LibroSerializer,
    CarritoCompraSerializer,
    ItemCarritoSerializer,
)

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

class CarritoCompraViewSet(viewsets.ModelViewSet):
    queryset = CarritoCompra.objects.all()
    serializer_class = CarritoCompraSerializer

class ItemCarritoViewSet(viewsets.ModelViewSet):
    queryset = ItemCarrito.objects.all()
    serializer_class = ItemCarritoSerializer