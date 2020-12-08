from app.models import AdCampaigns
from app.db_interface import tools


def get_all():
    return list(
        tools.select_from_query(
            AdCampaigns.objects.all(),
            [
                ('id', 'id'),
                ('title', 'title'),
                ('subtitle', 'subtitle'),
                ('text', 'text'),
                ('button_text', 'buttonText'),
                ('button_url', 'buttonUrl'),
            ]
        )
    )
