from app import db_interface
from helpers import wrap_response


def get_all(request):
    return wrap_response.wrap_data({"tutors": db_interface.tutor.get_all()})
