from django.db import models

# Create your models here.
class Autor(models.Model):
    nombreAutor = models.CharField(max_length=100, null=False, blank=False)
    apellidoAutor = models.CharField(max_length=100, null=False, blank=False)
    emailAutor = models.EmailField(max_length=100, null=True, blank=True)
    edadAutor = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.nombreAutor}"
    
    class Model:
        verbose_name = "autor"
        verbose_name_plural = "autores"


class TipoLibro(models.Model):
    tipoLibro = models.CharField(max_length=100, null=False, blank=False, default="")

    def __str__(self):
        return f"{self.tipoLibro}"


class Libro(models.Model):
    nombreLibro = models.CharField(max_length=100, null=False, blank=False)
    autorLibro = models.ForeignKey(Autor, max_length=100, null=False, blank=True, on_delete = models.CASCADE)
    tipoLibro = models.ForeignKey(TipoLibro, null=True, blank=True, on_delete = models.CASCADE)
    fechaLibro = models.DateField(max_length=100, null=True, blank=True)
    portadaLibro = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.nombreLibro}"
    
    class Model:
        verbose_name = "libro"
        verbose_name_plural = "libros"

class Users(models.Model):
    nombreUser = models.CharField(max_length=100, null = False, blank=False)
    emailUser = models.CharField(max_length=20, null=False,blank=False)
    passUser = models.CharField(max_length=20, null=False,blank=False )
    