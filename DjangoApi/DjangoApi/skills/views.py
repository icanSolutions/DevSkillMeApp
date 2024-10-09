from rest_framework import generics
from .models import Skill
from .serializers import SkillSerializer
from rest_framework.permissions import AllowAny


class SkillDetailView(generics.RetrieveAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    lookup_field = 'name'
    permission_classes = [AllowAny]  # Allow anyone to access this view


class SkillCreateView(generics.CreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class SkillUpdateView(generics.UpdateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer