from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioViewSet,
    LibroViewSett,
    OrderViewSet,
    OrderItemViewSet,
    TarjetaCompraViewSet,
)

router = DefaultRouter()
router.register(r'Usuario', UsuarioViewSet, basename='Usuario')
router.register(r'Libro', LibroViewSett, basename='libro')
router.register(r'Order', OrderViewSet, basename='order')
router.register(r'OrdeItem', OrderItemViewSet, basename='orderitem')
router.register(r'TarjetaCompra', TarjetaCompraViewSet, basename='tarjetacompra')

urlpatterns = [
    path('', include(router.urls)),
]