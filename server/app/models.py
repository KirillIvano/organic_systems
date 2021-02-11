from django.db.models import *
import helpers.random_hash
import helpers.download_image
from organicsystems import settings


def save_model_with_photo(
        model,
        url_field: str,
        file_field: str
):
    url = model.__getattribute__(url_field)
    if url:
        model.__setattr__(
            file_field,
            helpers.download_image.save_photo(url, settings.IMAGE_URL)
        )
        model.__setattr__(url_field, None)


class AdCampaign(Model):
    class Meta:
        verbose_name = 'Баннер'
        verbose_name_plural = 'Баннеры'

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
        upload_to=helpers.random_hash.hash_filename,
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
    title = CharField("Название", max_length=255)
    description = TextField("Описание")
    url = URLField("Ссылка на регистрацию")


class BlogCategory(Model):
    id = AutoField(primary_key=True)
    title = CharField("Название", max_length=255)


class Article(Model):
    id = AutoField(primary_key=True)
    blogCategory = ForeignKey(
        BlogCategory,
        verbose_name="Категория блога",
        on_delete=PROTECT
    )
    title = CharField("Название", max_length=255)
    date = DateField("Дата")
