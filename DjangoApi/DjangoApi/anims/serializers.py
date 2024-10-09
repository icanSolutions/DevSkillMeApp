from rest_framework import serializers
from .models import Anim

class AnimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anim
        fields = [
            'id',
            'name',
            'age',
            'profitability'
        ]

