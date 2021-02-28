from django.contrib import admin
from app.models import *


@admin.register(AdCampaign)
class AdCampaignAdmin(admin.ModelAdmin):
    pass


@admin.register(WorkshopTutor)
class WorkshopTutorAdmin(admin.ModelAdmin):
    fields = (
        'firstname',
        'lastname',
        'info',
        'image',
        'image_url',
    )


@admin.register(Workshop)
class WorkshopAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': (
                'title',
                'description',
                'url',
                'tutor'
            )
        }),
        ('Баннер', {
            'fields': (
                'banner_background',
                'banner_background_url',
                'banner_heading',
                'banner_subheading',
                'banner_text',
            ),
        }),
    )

    filter_horizontal = ('tutor',)
