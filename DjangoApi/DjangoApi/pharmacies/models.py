from django.db import models

# Create your models here.
class Pharmacy(models.Model):
    name = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
