# Generated by Django 4.2.14 on 2024-07-29 17:05

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("learningSchema", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="schema",
            name="name",
            field=models.CharField(default=None, max_length=20),
            preserve_default=False,
        ),
    ]
