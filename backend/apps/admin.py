from django.contrib import admin
from .models import (
    Libro,
    CarritoCompra,
    ItemCarrito,
)

# Register your models here.
admin.site.register(Libro)
admin.site.register(CarritoCompra)
admin.site.register(ItemCarrito)
