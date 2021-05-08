from app.models.models import Workshop, WorkshopTutor
from app.db_interface import tools
from app.db_interface.tutor import TUTOR_FIELDS

WORKSHOP_PREVIEW_FIELDS = (
    ('id', 'id'),
    ('title', 'title')
)

WORKSHOP_FIELDS = (
    ('id', 'id'),
    ('title', 'title'),
    ('url', 'url'),
    ('description', 'description'),
    ('banner_heading', 'bannerHeading'),
    ('banner_background', 'bannerImage'),
    ('banner_background_color', 'bannerTheme'),
    ('banner_subheading', 'bannerSubHeading'),
    ('banner_text', 'bannerText'),
)


def get_all():
    return [
        tools.to_dict(w, WORKSHOP_PREVIEW_FIELDS)
        for w in Workshop.objects.all()
    ]


def get(workshop_id: int):
    workshop_instance = Workshop.objects.get(id=workshop_id)
    workshop_dict = tools.to_dict(workshop_instance, WORKSHOP_FIELDS)
    tutors_instances = WorkshopTutor.objects.filter(workshop=workshop_instance)
    tutors_dicts = [tools.to_dict(t, TUTOR_FIELDS) for t in tutors_instances]
    workshop_dict.update(tutors=tutors_dicts)
    return workshop_dict