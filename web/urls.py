from django.contrib import admin
from django.urls import path,include
from .views import *
from .api import *

urlpatterns = [
    path('', main , name='main'),
    path('api/', api_main , name='api_main'),
]
