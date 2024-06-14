from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LibroViewSet,
)

router = DefaultRouter()
router.register("Libro", LibroViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
