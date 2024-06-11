from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    GeneroLibroViewSet,
    AutorLibroViewSet,
    AnioLibroViewSet,
    LibroViewSet,
    TipoUsuarioViewSet,
    UsuarioViewSet,
)

router = DefaultRouter()
router.register("GeneroLibro", GeneroLibroViewSet)
router.register("AutorLibro", AutorLibroViewSet)
router.register("AnioLibro", AnioLibroViewSet)
router.register("Libro", LibroViewSet)
router.register("TipoUsuario", TipoUsuarioViewSet)
router.register("Usuario", UsuarioViewSet)

urlpatterns = [
    path("django/restframework/", include(router.urls)),
]
