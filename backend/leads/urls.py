from django.urls import path
from .views import CustomerLeadCreateView

urlpatterns = [
    path('', CustomerLeadCreateView.as_view(), name='lead-create'),
]
