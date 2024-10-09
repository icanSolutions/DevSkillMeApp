from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.CourseDetailView.as_view()),
    path('create/', views.CourseCreateView.as_view()),
    path('update/<int:pk>', views.CourseUpdateView.as_view()),
]