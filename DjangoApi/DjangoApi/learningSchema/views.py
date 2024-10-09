from rest_framework import generics
from .models import Schema
from .serializers import SchemaSerializer

class SchemaDetailView(generics.RetrieveAPIView):
    queryset = Schema.objects.all()
    serializer_class = SchemaSerializer

class SchemaCreateView(generics.CreateAPIView):
    queryset = Schema.objects.all()
    serializer_class = SchemaSerializer

class SchemaUpdateView(generics.UpdateAPIView):
    queryset = Schema.objects.all()
    serializer_class = SchemaSerializer