from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LibroViewSet,
    CarritoCompraViewSet,
    ItemCarritoViewSet,
)

router = DefaultRouter()
router.register("Libro", LibroViewSet)
router.register("CarritoCompra", CarritoCompraViewSet)
router.register("ItemCarrito", ItemCarritoViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
