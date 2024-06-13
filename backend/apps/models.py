from django.db import models
from django.contrib.auth.models import User


class Libro(models.Model):
    tituloLibro = models.CharField(max_length=200, null=False, blank=False)
    generoLibro = models.CharField(max_length=200, null=True, blank=True)
    autorLibro = models.CharField(max_length=200, null=True, blank=True)
    anioLibro = models.IntegerField(null=True, blank=True)
    descripcionLibro = models.TextField(max_length=200, null=True, blank=True)
    portadaLibro = models.ImageField(upload_to="images/", null=True, blank=True)
    precioLibro = models.IntegerField(null=True, blank=True)
    archivoLibro = models.FileField(upload_to="documents/", null=True, blank=True)

    def __str__(self):
        return self.tituloLibro

    class Meta:
        verbose_name = "libro"
        verbose_name_plural = "libros"


class CarritoCompra(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Carrito de {self.user.username}"


class ItemCarrito(models.Model):
    carrito = models.ForeignKey(
        CarritoCompra, on_delete=models.CASCADE, related_name="items"
    )
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.cantidad} x {self.libro.tituloLibro}"

    def total_precio(self):
        if self.libro.precioLibro is not None:
            return self.libro.precioLibro * self.cantidad
        return 0
