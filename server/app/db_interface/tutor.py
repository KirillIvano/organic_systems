from app.models.models import WorkshopTutor
from app import db_interface
TUTOR_FIELDS = (
    ('fullname', 'name'),
    ('image', 'image'),
    ('info', 'info'),
)


def get_all():
    return [
        db_interface.tools.to_dict(t, TUTOR_FIELDS)
        for t in WorkshopTutor.objects.all()
    ]
