# Generated by Django 4.2.14 on 2024-08-12 14:42

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("skills", "0004_alter_skill_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="skill",
            name="count",
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
