import datetime
from django.db.models.fields.files import ImageFieldFile


def to_dict(instance, fields: [list, None]) -> dict:
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    obj = dict(instance.__dict__).copy()

    for key in ['_state', 'hash']:
        if obj.get(key) is not None:
            obj.pop(key)

    if fields is None:
        return obj
    else:
        new_obj = {}

        for field in fields:
            attr = obj[field[0]]
            if type(attr) in [datetime.datetime]:
                attr = attr.timestamp().__int__()
            new_obj[field[1]] = attr

        return new_obj


def select_from_query(query, fields):
    if fields and len(fields) == 1:
        field = fields[0]
        for obj in query:
            attr = obj.__getattribute__(field[0])
            if type(attr) in [ImageFieldFile, datetime.date]:
                yield attr.__str__()
            else:
                yield attr
    else:
        for obj in query:
            yield to_dict(obj, fields)


def select(model, key, value, fields: list = None):
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    query = model.objects.filter(**{key: value})
    return select_from_query(query, fields)


def select_single(model, key, value, fields: list = None):
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    try:
        instance = model.objects.get(**{key: value})
        instance = to_dict(instance, fields)
    except model.DoesNotExist:
        instance = None

    return instance
