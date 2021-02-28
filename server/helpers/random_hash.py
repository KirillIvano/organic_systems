import random
import re
from organicsystems import settings


def hash_string():
    return "%032x" % random.getrandbits(128)


def hash_filename(instance, filename):
    """
    deprecated
    """
    pass