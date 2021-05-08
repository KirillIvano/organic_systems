from django.http import HttpRequest
from django.core.exceptions import (
    FieldError,
    ValidationError
)
from helpers.wrap_response import *
from app.db_interface.newsletter import subscribe


def newsletter(request: HttpRequest):
    try:
        subscribe(request.body)
        return wrap_data({})
    except FieldError or ValidationError as e:
        return wrap_error("Ошибка добавления почты")
    except KeyError as e:
        return wrap_error(f"В запросе не передан email {request.body}")


def feedback(request: HttpRequest):
    return wrap_data({})
    # todo: форма для обратной связи


def become_a_salon(request: HttpRequest):
    return wrap_data({})
    # todo: форма для обратной связи

