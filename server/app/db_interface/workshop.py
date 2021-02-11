from app.models import Workshop
from app.db_interface import tools


def get_all():
    return tools.select_from_query(Workshop.objects.all())

