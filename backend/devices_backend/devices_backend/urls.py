from django.contrib import admin
from django.urls import path
from devices.api import app

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', app.urls)
]
