from app.models import AdCampaign
from app.db_interface import tools


def get_all():
    return list(
        tools.select_from_query(
            AdCampaign.objects.all(),
            [
                ('id', 'id'),
                ('title', 'title'),
                ('subtitle', 'subtitle'),
                ('text', 'text'),
                ('button_text', 'buttonText'),
                ('button_url', 'buttonUrl'),
                ('background', 'background'),
                ('font_color', 'fontColor')
            ]
        )
    )
