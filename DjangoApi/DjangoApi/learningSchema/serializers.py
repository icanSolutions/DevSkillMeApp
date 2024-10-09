from rest_framework import serializers
from .models import Schema

class SchemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schema
        fields = '__all__'

    def validate_name(self, value):
        if not value[0].isupper():
            raise serializers.ValidationError("First Letter Have To Be Uppercase")
