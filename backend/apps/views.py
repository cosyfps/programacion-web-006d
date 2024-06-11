from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CarritoCompra, ItemCarrito, Libro
from .serializers import CarritoCompraSerializer, ItemCarritoSerializer, LibroSerializer
from django.shortcuts import get_object_or_404


class LibroCreateView(generics.CreateAPIView):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class LibroListView(generics.ListAPIView):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer
    permission_classes = [permissions.AllowAny]


class LibroDeleteView(generics.DestroyAPIView):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class CarritoCompraDetailView(generics.RetrieveAPIView):
    serializer_class = CarritoCompraSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        carrito, created = CarritoCompra.objects.get_or_create(user=self.request.user)
        return carrito


class AddItemCarritoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        carrito, created = CarritoCompra.objects.get_or_create(user=request.user)
        libro = get_object_or_404(Libro, id=request.data.get("libro_id"))
        cantidad = int(request.data.get("cantidad", 1))

        item, created = ItemCarrito.objects.get_or_create(carrito=carrito, libro=libro)
        if not created:
            item.cantidad += cantidad
        else:
            item.cantidad = cantidad
        item.save()

        serializer = ItemCarritoSerializer(item)
        return Response(serializer.data)


class RemoveItemCarritoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        carrito = get_object_or_404(CarritoCompra, user=request.user)
        libro = get_object_or_404(Libro, id=request.data.get("libro_id"))

        item = get_object_or_404(ItemCarrito, carrito=carrito, libro=libro)
        item.delete()

        return Response(status=204)
