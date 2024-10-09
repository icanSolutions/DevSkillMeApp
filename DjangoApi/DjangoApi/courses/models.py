from django.db import models
from domains.models import Domain
from skills.models import Skill

# Create your models here.
class Course(models.Model):
    name = models.CharField(max_length=20)

    domains = models.ManyToManyField(Domain, related_name='courses')

    skills = models.ManyToManyField(Skill, related_name='courses')

    duration = models.DurationField()

    EASY = 'EASY'
    MEDIUM = 'MEDIUM'
    HARD = 'HARD'

    choices_list = [
        (EASY, 'EASY'),
        (MEDIUM, 'Medium'),
        (HARD, 'HARD'),
    ]

    level = models.CharField(
        max_length=10,
        choices=choices_list,
        default=MEDIUM
    )

