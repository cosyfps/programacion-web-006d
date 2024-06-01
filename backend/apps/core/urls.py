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
router.register("asistencias", GeneroLibroViewSet)
router.register("secciones", AutorLibroViewSet)
router.register("estudiantes", AnioLibroViewSet)
router.register("cursos", LibroViewSet)
router.register("users", TipoUsuarioViewSet)
router.register("users", UsuarioViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
