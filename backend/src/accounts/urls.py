# api/urls.py
from django.urls import path, include
from . import views
urlpatterns = [
    path('api/v1/', include("accounts.api.jwt.urls")),
    path('api/v1/', include("employee.api.urls")),
]
