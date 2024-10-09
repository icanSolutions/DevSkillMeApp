from django.db import models

# Create your models here.
class Skill(models.Model):
    name = models.CharField(max_length=100)

    PROGRAMING = 'PROGRAMING'
    SOFT = 'SOFT'

    choices_list = [
        (PROGRAMING, 'Programing'),
        (SOFT, 'Soft'),
    ]

    type = models.CharField(
        max_length=20,
        choices=choices_list,
        default=PROGRAMING
    )

    count = models.IntegerField()


    def demand(self):
        return self.domains.count()