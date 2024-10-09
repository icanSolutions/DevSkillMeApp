from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from .models import Domain
from .serializers import DomainSerializer, SkillSerializer, DomainNamesListSerializer

class DomainDetailView(generics.RetrieveAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    lookup_field = 'name'
    permission_classes = [IsAuthenticated]  # Allow anyone to access this view

class DomainSkillsView(generics.GenericAPIView):
    queryset = Domain.objects.all()
    serializer_class = SkillSerializer
    lookup_field = 'name'
    permission_classes = [AllowAny]  # Allow anyone to access this view


    def get(self, request, *args, **kwargs):
        name = kwargs.get('name')
        try:
            domain = Domain.objects.get(name=name)
        except Domain.DoesNotExist:
            raise NotFound('Domain does not exist')

        skills = domain.skills.all()
        serializer = self.get_serializer(skills, many=True)
        return Response(serializer.data)

class DomainListView(generics.ListAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainNamesListSerializer
    permission_classes = [AllowAny]  # Allow anyone to access this view


    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        domain_names = queryset.values_list('name', flat=True)
        return Response(domain_names)

class DomainCreateView(generics.CreateAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer


# # views.py for domains app
#
# from .serializers import DomainSerializer
# from skills.services import SkillsService
# from skills.models import Skill
#
#
# class DomainCreateView(generics.CreateAPIView):
#     queryset = Domain.objects.all()
#     serializer_class = DomainSerializer

    # def perform_create(self, serializer):
    #     # Save the new domain instance first
    #     domain = serializer.save()
    #
    #     # Get the domain name to fetch related skills
    #     name = domain.name
    #
    #     # Initialize SkillsService with the domain name to fetch skills
    #     skills_service = SkillsService(name)
    #     skills = skills_service.get_skills()
    #
    #     # Iterate over the skills and create or update Skill instances
    #     for skill_data in skills:
    #         skill_name = skill_data['skill']
    #         skill_type = skill_data['type']
    #
    #         # Create or get the Skill instance
    #         skill, created = Skill.objects.get_or_create(
    #             name=skill_name,
    #             defaults={'type': skill_type}
    #         )
    #
    #         if not created:
    #             # If the skill already exists, update the type if necessary
    #             skill.type = skill_type
    #             skill.save()
    #
    #         # Associate the skill with the domain
    #         domain.skills.add(skill)


class DomainUpdateView(generics.UpdateAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer