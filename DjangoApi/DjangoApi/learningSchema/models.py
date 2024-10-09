from django.db import models
from domains.models import Domain
from courses.models import Course
from datetime import timedelta


# Create your models here.
class Schema(models.Model):
    name = models.CharField(max_length=20)

    domain = models.ForeignKey(
        Domain,
        related_name='learning_schema',
        on_delete=models.CASCADE
    )

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

    courses = models.ManyToManyField(
        Course,
        related_name='courses',
    )

    def duration(self):
        courses_durs = [course.duration for course in self.courses.all()]
        total_courses_duration = sum(courses_durs, timedelta())
        total_hours = total_courses_duration.total_seconds() / 3600
        total_schema_duration = round(total_hours / 2, 0)
        return total_schema_duration




