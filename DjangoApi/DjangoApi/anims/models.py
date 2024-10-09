from django.db import models

# Create your models here.
class Anim(models.Model):
    name = models.CharField(max_length=20)
    age = models.IntegerField()

    def profitability(self):
        return self.age - 30
