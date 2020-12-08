import requests
from bs4 import BeautifulSoup


def change_encoding(string, current='ISO-8859-1', to='utf-8'):
    return string.encode(current).decode(to)


def get_article_from_teletype(teletype_link):
    try:
        response = requests.get(teletype_link)
        response_decoded = change_encoding(response.text)
        soup = BeautifulSoup(response_decoded, features='html.parser')
        article_text = str(soup.find('article'))
        return article_text
    except:
        return None
