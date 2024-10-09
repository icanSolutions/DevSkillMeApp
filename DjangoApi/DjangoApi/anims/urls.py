from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.AnimDetailView.as_view()),
    path('create/', views.AnimCreateView.as_view()),
    path('update/<int:pk>', views.AnimUpdateView.as_view()),
]