import json
from django.http import HttpResponse


def wrap_data(data: dict) -> HttpResponse:
    return HttpResponse(
        json.dumps({'data': data}, ensure_ascii=False)
    )


def wrap_error(message: str, status: int = 400) -> HttpResponse:
    return HttpResponse(
        json.dumps({'error': message}, ensure_ascii=False),
        status=status
    )
