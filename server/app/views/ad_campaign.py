from app.db_interface import ad_campaign
from helpers.wrap_response import *


def get_all(request):
    return wrap_data(ad_campaign.get_all())
