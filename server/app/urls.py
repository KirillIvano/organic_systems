from django.urls import path
from app.views import *


urlpatterns = [
    path('adCampaigns', ad_campaign.get_all),
    path('workshops', workshop.get_all),
    path('workshop/<int:workshop_id>', workshop.get),
    path('tutor/all', tutor.get_all),
    # forms
    path('forms/newsletter', forms.newsletter),
    path('feedback', forms.feedback),
]


