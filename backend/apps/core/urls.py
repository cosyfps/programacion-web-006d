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
    path("", include(router.urls)),
]

from . import views

urlpatterns += [
    path('administracion/', views.AdminView.as_view(), name="admin"),
    # 
    path('libros/list', views.LibroListView.as_view(), name='libros_list'),
    path('libros/update/list', views.LibroListView.as_view(), name='libros_list'),
    path('libros/delete/list', views.LibroListView.as_view(), name='libros_list'),
    path('libros/form', views.LibroCreateView.as_view(), name='libros_form'),
    path('libros/update/<int:pk>', views.LibroUpdateView.as_view(), name='libros_update'),
    path('libros/delete/<int:pk>', views.LibroDeleteView.as_view(), name='libros_delete'),
    # 
    path('usuarios/list', views.UsuarioListView.as_view(), name='usuarios_list'),
    path('usuarios/update/list', views.UsuarioListView.as_view(), name='usuarios_list'),
    path('usuarios/delete/list', views.UsuarioListView.as_view(), name='usuarios_list'),
    path('usuarios/form', views.UsuarioCreateView.as_view(), name='usuarios_form'),
    path('usuarios/update/<int:pk>', views.UsuarioUpdateView.as_view(), name='usuarios_update'),
    path('usuarios/delete/<int:pk>', views.UsuarioDeleteView.as_view(), name='usuarios_delete'),
]
