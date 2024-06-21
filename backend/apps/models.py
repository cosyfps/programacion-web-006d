from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class User(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_set",
        blank=True,
        help_text=(
            "Los grupos a los que pertenece este usuario. Un usuario obtendrá todos los permisos concedidos a cada uno de sus grupos."
        ),
        verbose_name=("grupos"),
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",
        blank=True,
        help_text=("Permisos específicos para este usuario."),
        verbose_name=("permisos de usuario"),
    )

    def __str__(self):
        return self.username if self.username else self.email

    class Meta:
        verbose_name = "usuario"
        verbose_name_plural = "usuarios"


class Libro(models.Model):
    tituloLibro = models.CharField(max_length=200, null=True, blank=True)
    autorLibro = models.CharField(max_length=200, null=True, blank=True)
    generoLibro = models.CharField(max_length=200, null=True, blank=True)
    anioLibro = models.IntegerField(null=True, blank=True)
    descripcionLibro = models.TextField(max_length=1000, null=True, blank=True)
    precioLibro = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.BooleanField(default=True, null=True, blank=True)
    portadaLibro = models.ImageField(upload_to="images/", null=True, blank=True)

    def __str__(self):
        return self.tituloLibro

    class Meta:
        verbose_name = "libro"
        verbose_name_plural = "libros"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=100, null=True)

    def __str__(self):
        return str(self.id)

    @property
    def shipping(self):
        shipping = False
        orderitems = self.orderitem_set.all()
        for i in orderitems:
            if not i.libro.digital:
                shipping = True
        return shipping

    @property
    def get_cart_total(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.get_total for item in orderitems])
        return total

    @property
    def get_cart_items(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.quantity for item in orderitems])
        return total

    class Meta:
        verbose_name = "orden"
        verbose_name_plural = "ordenes"


class OrderItem(models.Model):
    libro = models.ForeignKey(Libro, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)

    @property
    def get_total(self):
        total = self.libro.precioLibro * self.quantity
        return total

    class Meta:
        verbose_name = "item de orden"
        verbose_name_plural = "items de orden"


class TarjetaCompra(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    numeroTarjeta = models.IntegerField(null=False)
    nombreTitular = models.CharField(max_length=200, null=False)
    fechaCaducidad = models.CharField(max_length=200, null=False)
    codigoCvc = models.IntegerField(null=False)
    zipcode = models.CharField(max_length=200, null=False)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.numeroTarjeta)

    class Meta:
        verbose_name = "tarjeta de compra"
        verbose_name_plural = "tarjetas de compra"
