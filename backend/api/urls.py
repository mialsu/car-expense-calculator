from django.urls import path, include
from api.views import CalculationResult
urlpatterns = [
    path('calculate/', CalculationResult.as_view(), name='api_calculate'),
]