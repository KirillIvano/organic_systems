import datetime
from django.db.models.fields.files import ImageFieldFile


def to_dict(instance, fields: [list, None]) -> dict:
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    if fields is None:
        return {}

    obj = {}
    for field in fields:
        db_key, api_key = field
        value = instance.__getattribute__(db_key)
        # if type(value) in [datetime.datetime, ImageFieldFile]:
        #     value = str(value)
        #
        obj.update(**{api_key: value})
    return obj
