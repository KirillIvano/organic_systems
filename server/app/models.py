from django.db.models import *


class AdCampaigns(Model):
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


class Workshop(Model):
    id = AutoField(primary_key=True)
    title = CharField("Название", max_length=255)
    description = TextField("Описание")


class Event(Model):
    id = AutoField(primary_key=True)
    workshop = ForeignKey(Workshop, verbose_name="Воркшоп", on_delete=CASCADE)
    datetime = DateTimeField("Дата и время")


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
