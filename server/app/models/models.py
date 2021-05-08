from django.db.models import *
from django.core.management import call_command
from .colors import COLOR_CHOICES
import helpers.random_hash
import helpers.images
# from organicsystems import settings


def save_model_with_photo(
        model,
        url_field: str,
        file_field: str
):
    url = model.__getattribute__(url_field)
    if url:
        model.__setattr__(
            file_field,
            helpers.images.download_image_from_source(url)
        )
        model.__setattr__(url_field, None)

    call_command('collectstatic', verbosity=0, interactive=False)


class AdCampaign(Model):
    class Meta:
        verbose_name = 'Рекламный баннер'
        verbose_name_plural = 'Рекламные баннеры'

    def __str__(self):
        return self.title

    id = AutoField(primary_key=True)
    title = TextField("Заголовок")
    subtitle = TextField("Подзаголовок")
    text = TextField(
        "Текст",
        null=True, blank=True
    )
    button_text = CharField(
        verbose_name="Текст кнопки",
        max_length=255
    )
    button_url = CharField(
        verbose_name="Ссылка кнопки",
        max_length=511
    )
    background_url = CharField(
        verbose_name='Ссылка на фон',
        max_length=511,
        blank=True, null=True
    )
    background = ImageField(
        verbose_name='Фон',
        upload_to=helpers.images.create_image_path,
        null=True, blank=True
    )
    font_color = CharField(
        max_length=6,
        verbose_name="Цвет шрифта",
        choices=[
            ("dark", "Тёмный"),
            ("light", "Светлый"),
        ],
        default="dark"
    )

    def save(self, *a, **kw):
        save_model_with_photo(self, 'background_url', 'background')
        super().save(*a, **kw)


class Workshop(Model):
    class Meta:
        verbose_name = 'Воркшоп'
        verbose_name_plural = 'Воркшопы'

    def __str__(self):
        return self.title

    id = AutoField(primary_key=True)
    hash = CharField(
        max_length=32,
        default=helpers.random_hash.hash_string
    )
    title = CharField("Название", max_length=255)
    description = TextField("Описание")
    url = URLField("Ссылка на регистрацию")
    banner_background = ImageField(
        verbose_name='Фон',
        upload_to=helpers.images.create_image_path,
        null=True, blank=True
    )
    banner_background_url = CharField(
        verbose_name='Ссылка на фон',
        max_length=511,
        blank=True, null=True
    )
    banner_background_color = CharField(
        "Цвет текста",
        max_length=64,
        choices=COLOR_CHOICES,
    )
    banner_heading = CharField(
        verbose_name="Заголовок",
        max_length=511
    )
    banner_subheading = CharField(
        verbose_name="Подзаголовок",
        max_length=511
    )
    banner_text = TextField(
        verbose_name="Текст"
    )
    tutor = ManyToManyField(
        verbose_name="Преподаватели",
        to="WorkshopTutor",
        null=True, blank=True
    )

    def save(self, *a, **kw):
        save_model_with_photo(self, 'banner_background_url', 'banner_background')
        super().save(*a, **kw)


class WorkshopTutor(Model):
    class Meta:
        verbose_name = "Преподаватель"
        verbose_name_plural = "Преподаватели"

    def __str__(self):
        return self.fullname

    @property
    def fullname(self):
        return f"{self.firstname} {self.lastname}"

    id = AutoField(primary_key=True)
    hash = CharField(
        max_length=32,
        default=helpers.random_hash.hash_string
    )
    firstname = CharField(
        verbose_name="Имя",
        max_length=511
    )
    lastname = CharField(
        verbose_name="Фамилия",
        max_length=511
    )

    info = TextField(
        verbose_name="Информация"
    )
    image = ImageField(
        verbose_name="Фото",
        upload_to=helpers.images.create_image_path,
        blank=True, null=True
    )
    image_url = CharField(
        verbose_name='Ссылка на фото',
        max_length=511,
        blank=True, null=True
    )

    def save(self, *a, **kw):
        save_model_with_photo(self, 'image_url', 'image')
        super().save(*a, **kw)


class EmailNewsletterSubscriber(Model):
    email = EmailField()