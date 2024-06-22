from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    UserViewSet,
    LibroViewSett,
    OrderViewSet,
    OrderItemViewSet,
    TarjetaCompraViewSet,
)

router = DefaultRouter()
router.register(r"usuario", UserViewSet, basename="usuario")
router.register(r"libro", LibroViewSett, basename="libro")
router.register(r"order", OrderViewSet, basename="order")
router.register(r"ordeItem", OrderItemViewSet, basename="orderitem")
router.register(r"tarjetaCompra", TarjetaCompraViewSet, basename="tarjetacompra")

urlpatterns = [
    path("", include(router.urls)),
    path('usuario/retrieve-by-username/', UserViewSet.as_view({'post': 'retrieve_by_username'}), name='user-retrieve-by-username'),
]
