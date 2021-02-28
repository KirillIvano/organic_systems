from app.models import AdCampaign
from app.db_interface import tools

AD_CAMPAIGN_FIELDS = (
    ('id', 'id'),
    ('title', 'title'),
    ('subtitle', 'subtitle'),
    ('text', 'text'),
    ('button_text', 'buttonText'),
    ('button_url', 'buttonUrl'),
    ('background', 'background'),
    ('font_color', 'fontColor')
)


def get_all():
    return [
        tools.to_dict(i, AD_CAMPAIGN_FIELDS) for i in AdCampaign.objects.all()
    ]
