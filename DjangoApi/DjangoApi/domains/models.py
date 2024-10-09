from django.db import models
from skills.models import Skill

class Domain(models.Model):
    name = models.CharField(max_length=100)

    PARENT = 'PARENT'
    CHILD = 'CHILD'

    choices_list = [
        (PARENT, 'Parent'),
        (CHILD, 'Child'),
    ]

    gender = models.CharField(
        max_length=10,
        choices=choices_list,
        default=PARENT
    )

    average_salary = models.IntegerField()
    demand = models.CharField(max_length=50)
    skills = models.ManyToManyField(Skill, related_name='domains', blank=True)

    def relate_skills(self):
        from skills.services import SkillsService  # Import here to avoid circular import issues

        # Initialize SkillsService with the domain name to fetch skills
        skills_service = SkillsService(self.name)
        skills = skills_service.get_skills()

        # Iterate over the skills and create or update Skill instances
        for skill_data in skills:
            skill_name = skill_data['skill']
            skill_type = skill_data['type']
            skill_count = skill_data['count']

            # Create or get the Skill instance
            skill, created = Skill.objects.get_or_create(
                name=skill_name,
                defaults={
                    'type': skill_type,
                    'count': skill_count
                }
            )

            if not created:
                # If the skill already exists, update the type if necessary
                skill.type = skill_type
                skill.count = skill_count
                skill.save()

            # Associate the skill with the domain
            self.skills.add(skill)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.relate_skills()  # Relate skills automatically after saving the domain
