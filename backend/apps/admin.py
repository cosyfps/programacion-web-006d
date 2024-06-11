from django.contrib import admin
from .models import (
    GeneroLibro,
    AutorLibro,
    AnioLibro,
    Libro,
    CarritoCompra,
    ItemCarrito,
)

# Register your models here.
admin.site.register(GeneroLibro)
admin.site.register(AutorLibro)
admin.site.register(AnioLibro)
admin.site.register(Libro)
admin.site.register(CarritoCompra)
admin.site.register(ItemCarrito)
