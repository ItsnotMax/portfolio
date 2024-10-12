import requests
from title.title import find_title
from author.author import find_author
from article.article import find_article
from date.date import find_date
from bs4 import BeautifulSoup


def pars(url):
    response = requests.get(url)
    page_content = response.text

    soup = BeautifulSoup(page_content, "html.parser")

    title = find_title(soup) or "Заголовков нет"
    author = find_author(soup) or "Автора нет"
    article = find_article(soup) or "Текста статьи нет"
    date = find_date(soup) or "Дата не указана"

    print("--- Заголовок ---")
    print(title["title"])
    print(title["second_title"])
    print()
    print("--- Дата ---")
    print(date["date"])
    print()
    print("--- Автор ---")
    print(author["author"])
    print()
    print("--- Текст статьи ---")
    print(article["text"])


if __name__ == "__main__":
    pars(url="https://ria.ru/20240401/pozhar-1937078258.html")




# Или имелись ввиду подобные паттерны?

# title_pattern = r'(?<=<h1 class="article__title">).*?(?=</h1>)'
# text_pattern = r'(?<=<div class="article__text">).*?(?=</div>)'
# date_pattern = r'(?<=<div class="article__info-date">).*?(?=</div>)'
# author_pattern = r'(?<=<div class="article__info-author">).*?(?=</div>)'

# title = re.search(title_pattern, html).group(0)
# text = re.findall(text_pattern, html)
# date = re.search(date_pattern, html).group(0)
# author_match = re.search(author_pattern, html)
# author = author_match.group(0) if author_match else "Автор не указан"

# print(f"Заголовок: {title}")
# print(f"Дата: {date}")
# print(f"Автор: {author}")
# print("Текст статьи:")
# for paragraph in text:
#     print(paragraph)