# Generated by Django 4.2.14 on 2024-08-09 13:37

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("skills", "0002_skill_name"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="skill",
            name="domains",
        ),
    ]
