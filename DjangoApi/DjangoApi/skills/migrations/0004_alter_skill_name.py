# Generated by Django 4.2.14 on 2024-08-09 14:01

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("skills", "0003_remove_skill_domains"),
    ]

    operations = [
        migrations.AlterField(
            model_name="skill",
            name="name",
            field=models.CharField(max_length=100),
        ),
    ]
