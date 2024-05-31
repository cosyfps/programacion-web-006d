from django.shortcuts import render
from rest_framework import generics,permissions
from django.contrib.auth.models import User
from .models import Users
from .serializers import UserSerializer
# Create your views here.
