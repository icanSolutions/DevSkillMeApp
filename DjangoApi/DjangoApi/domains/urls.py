from django.urls import path
from . import views

urlpatterns = [
    path('', views.DomainListView.as_view()),
    path('<str:name>/', views.DomainDetailView.as_view()),
    path('create/', views.DomainCreateView.as_view()),
    path('update/<int:pk>', views.DomainUpdateView.as_view()),
    path('<str:name>/skills', views.DomainSkillsView.as_view()),
]