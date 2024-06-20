from django.contrib import admin
from .models import (
    User,
    Libro,
    Order,
    OrderItem,
    TarjetaCompra,
)

# Register your models here.
admin.site.register(User)
admin.site.register(Libro)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(TarjetaCompra)
