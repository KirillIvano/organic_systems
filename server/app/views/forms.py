from helpers.wrap_response import *
from django.http import HttpRequest


def newsletter(request: HttpRequest):
    return wrap_data({})
    # todo: форма для подписки на новостную рассылку
