# Generated by Django 3.0.8 on 2020-12-06 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_adcampaigns'),
    ]

    operations = [
        migrations.AlterField(
            model_name='adcampaigns',
            name='text',
            field=models.TextField(blank=True, null=True, verbose_name='Текст'),
        ),
    ]
