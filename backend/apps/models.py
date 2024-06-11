from django.db import models
from django.contrib.auth.models import User


class GeneroLibro(models.Model):
    generoLibro = models.CharField(max_length=100, null=False, blank=False, default="")

    def __str__(self):
        return self.generoLibro


class AutorLibro(models.Model):
    nombreAutor = models.CharField(max_length=100, null=False, blank=False)
    apellidoAutor = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return f"{self.nombreAutor} {self.apellidoAutor}"


class AnioLibro(models.Model):
    anio = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return str(self.anio)


class Libro(models.Model):
    tituloLibro = models.CharField(max_length=200, null=False, blank=False)
    generoLibro = models.ForeignKey(
        GeneroLibro, null=True, blank=True, on_delete=models.SET_NULL
    )
    autorLibro = models.ForeignKey(
        AutorLibro, null=True, blank=True, on_delete=models.SET_NULL
    )
    anioLibro = models.ForeignKey(
        AnioLibro, null=True, blank=True, on_delete=models.SET_NULL
    )
    descripcionLibro = models.TextField(null=True, blank=True)
    portadaLibro = models.ImageField(null=True, blank=True)
    precioLibro = models.FloatField(null=True, blank=True)

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
