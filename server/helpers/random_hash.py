import random
import re


def hash_string():
    return "%032x" % random.getrandbits(128)


def hash_filename(instance, filename, images_url):
    return images_url + instance.hash + '.' + re.findall('\.(\w*)$', filename)[0]

