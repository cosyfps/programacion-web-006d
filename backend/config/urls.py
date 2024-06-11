"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from apps.views import (
    LibroCreateView,
    LibroListView,
    LibroDeleteView,
    CarritoCompraDetailView,
    AddItemCarritoView,
    RemoveItemCarritoView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("libros/", LibroListView.as_view(), name="libro-list"),
    path("libros/crear/", LibroCreateView.as_view(), name="libro-create"),
    path("libros/eliminar/<int:pk>/", LibroDeleteView.as_view(), name="libro-delete"),
    path("carrito/", CarritoCompraDetailView.as_view(), name="carrito-detalle"),
    path("carrito/agregar/", AddItemCarritoView.as_view(), name="carrito-agregar"),
    path("carrito/eliminar/", RemoveItemCarritoView.as_view(), name="carrito-eliminar"),
]
