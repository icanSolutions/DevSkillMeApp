from rest_framework import serializers
from .models import Domain
from skills.models import Skill

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name', 'type']  # Include any other fields you need


class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = '__all__'

class DomainNamesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = ['name']