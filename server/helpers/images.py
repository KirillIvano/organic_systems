import requests
import shutil
import re
import os
from helpers import random_hash
from organicsystems import settings


def download_image_from_source(image_url):
    r = requests.get(image_url, stream=True)
    extension = image_url[image_url.rfind('.'):]
    filename = settings.IMAGES_PATH + random_hash.hash_string() + extension
    r.raw.decode_content = True

    with open(filename, 'wb+') as f:
        shutil.copyfileobj(r.raw, f)

    return filename


def create_image_path(instance, filename_raw):
    file_extension = re.findall('\.(\w*)$', filename_raw)[0]
    image_path = settings.IMAGES_PATH + instance.hash + '.' + file_extension
    print(image_path)
    return image_path

