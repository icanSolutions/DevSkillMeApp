from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.SchemaDetailView.as_view()),
    path('create/', views.SchemaCreateView.as_view()),
    path('update/<int:pk>', views.SchemaUpdateView.as_view()),
]