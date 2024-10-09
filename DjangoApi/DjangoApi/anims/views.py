from rest_framework import generics
from .models import Anim
from .serializers import AnimSerializer

class AnimDetailView(generics.RetrieveAPIView):
    queryset = Anim.objects.all()
    serializer_class = AnimSerializer

class AnimCreateView(generics.CreateAPIView):
    queryset = Anim.objects.all()
    serializer_class = AnimSerializer

class AnimUpdateView(generics.UpdateAPIView):
    queryset = Anim.objects.all()
    serializer_class = AnimSerializer