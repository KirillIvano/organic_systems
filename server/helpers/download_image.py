from helpers import random_hash
import requests
import shutil


def save_photo(image_url, images_url):
    r = requests.get(image_url, stream=True)
    extension = image_url[image_url.rfind('.'):]
    filename = images_url + random_hash.hash_string() + extension
    r.raw.decode_content = True

    with open('./' + filename, 'wb+') as f:
        shutil.copyfileobj(r.raw, f)

    return filename
