from django.contrib import admin
from app.models import *


@admin.register(AdCampaign)
class AdCampaigns(admin.ModelAdmin):
    pass
