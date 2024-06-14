from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LibroViewSett,
    OrderViewSet,
    OrderItemViewSet,
    TarjetaCompraViewSet,
    MyViewSet,
)

router = DefaultRouter()
router.register(r'Libro', LibroViewSett, basename='libro')
router.register(r'Order', OrderViewSet, basename='order')
router.register(r'OrdeItem', OrderItemViewSet, basename='orderitem')
router.register(r'TarjetaCompra', TarjetaCompraViewSet, basename='tarjetacompra')
router.register(r'myview', MyViewSet, basename='myview')

urlpatterns = [
    *router.urls,
]