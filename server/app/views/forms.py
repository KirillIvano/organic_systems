from helpers.wrap_response import *
from django.http import HttpRequest
import logging


def newsletter(request: HttpRequest):
    logging.debug(request.body)
    return wrap_data({})
    # todo: форма для подписки на новостную рассылку
