import random
import re
import os
from oright import settings


def hash_string():
    return "%032x" % random.getrandbits(128)


def hash_filename(instance, filename):
    return settings.IMAGES_URL + instance.hash + '.' + re.findall('\.(\w*)$', filename)[0]

