import re


def find_date(soup):
    pattern = re.compile(r"\d{2}\.\d{2}\.\d{4}")
    date_div = soup.find("div", class_="article__info-date")

    if date_div:
        text = date_div.find("a").get_text(strip=True)
        date_match = pattern.search(text)
        date = date_match.group(0) if date_match else "Дата не найдена"
        return {"date": date}

    else:
        return None
