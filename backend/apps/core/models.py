from django.db import models


# Create your models here.
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

    def __str__(self):
        return self.tituloLibro

    class Meta:
        verbose_name = "libro"
        verbose_name_plural = "libros"


class TipoUsuario(models.Model):
    tipoUsuario = models.CharField(max_length=100, null=False, blank=False, default="")

    def __str__(self):
        return self.tipoUsuario


class Usuario(models.Model):
    nombreUsuario = models.CharField(max_length=100, null=False, blank=False)
    apellidoUsuario = models.CharField(max_length=100, null=False, blank=False)
    emailUsuario = models.EmailField(max_length=100, null=True, blank=True)
    tipoUsuario = models.ForeignKey(
        TipoUsuario, null=True, blank=True, on_delete=models.SET_NULL
    )
    edadUsuario = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.nombreUsuario} {self.apellidoUsuario}"

    class Meta:
        verbose_name = "usuario"
        verbose_name_plural = "usuarios"
