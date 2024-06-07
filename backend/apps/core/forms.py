from django import forms
from .models import Libro, Usuario


class LibroForm(forms.ModelForm):
    class Meta:
        model = Libro
        fields = "__all__"


class UsuarioForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = "__all__"
