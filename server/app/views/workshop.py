from app import db_interface
from helpers.wrap_response import *


def get_all(request):
    return wrap_data(
        {'workshops': list(db_interface.workshop.get_all())}
    )
