def find_title(soup):
    header_div = soup.find("div", class_="article__header")

    if header_div:
        title_div = header_div.find("div", class_="article__title")
        second_title_div = header_div.find("h1", class_="article__second-title")

        title = title_div.get_text(strip=True) if title_div else "Первого заголовка нет"
        second_title = (
            second_title_div.get_text(strip=True)
            if second_title_div
            else "Второго заголовка нет"
        )

        return {"title": title, "second_title": second_title}

    return "Заголовков нет"
