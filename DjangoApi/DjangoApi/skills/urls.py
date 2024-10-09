from django.urls import path
from . import views

urlpatterns = [
    path('<str:name>/', views.SkillDetailView.as_view()),
    path('create/', views.SkillCreateView.as_view()),
    path('update/<int:pk>', views.SkillUpdateView.as_view()),
]