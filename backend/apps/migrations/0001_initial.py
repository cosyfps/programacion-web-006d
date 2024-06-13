# Generated by Django 5.0.6 on 2024-06-13 07:50

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Libro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tituloLibro', models.CharField(max_length=200)),
                ('generoLibro', models.CharField(blank=True, max_length=200, null=True)),
                ('autorLibro', models.CharField(blank=True, max_length=200, null=True)),
                ('anioLibro', models.IntegerField(blank=True, null=True)),
                ('descripcionLibro', models.TextField(blank=True, max_length=200, null=True)),
                ('portadaLibro', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('precioLibro', models.IntegerField(blank=True, null=True)),
                ('archivoLibro', models.FileField(blank=True, null=True, upload_to='documents/')),
            ],
            options={
                'verbose_name': 'libro',
                'verbose_name_plural': 'libros',
            },
        ),
        migrations.CreateModel(
            name='CarritoCompra',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ItemCarrito',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.PositiveIntegerField(default=1)),
                ('carrito', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='apps.carritocompra')),
                ('libro', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apps.libro')),
            ],
        ),
    ]
