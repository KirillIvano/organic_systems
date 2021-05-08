from app import db_interface
from app import models
from helpers.wrap_response import *


def get_all(request):
    return wrap_data(
        {'workshops': db_interface.workshop.get_all()}
    )


def get(request, workshop_id):
    try:
        return wrap_data(
            db_interface.workshop.get(workshop_id)
        )
    except models.models.Workshop.DoesNotExist:
        return wrap_error("Нет воркшопа с таким id", 404)
