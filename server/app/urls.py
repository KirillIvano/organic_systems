from django.urls import path
from app.views import *


urlpatterns = [
    path('adCampaigns', ad_campaign.get_all),
    path('workshops', workshop.get_all),
    # forms
    path('forms/newsletter', forms.newsletter),
]

forms = [

]

