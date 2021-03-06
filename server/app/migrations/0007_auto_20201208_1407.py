# Generated by Django 3.0.8 on 2020-12-08 14:07

from django.db import migrations, models
import helpers.random_hash


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_adcampaign_background'),
    ]

    operations = [
        migrations.AddField(
            model_name='adcampaign',
            name='background_url',
            field=models.CharField(blank=True, max_length=511, null=True, verbose_name='Ссылка на фон'),
        ),
        migrations.AlterField(
            model_name='adcampaign',
            name='background',
            field=models.ImageField(blank=True, null=True, upload_to=helpers.random_hash.hash_filename, verbose_name='Фон'),
        ),
    ]
