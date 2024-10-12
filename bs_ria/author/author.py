import re


def find_author(soup):
    pattern = r"© РИА Новости / (.+)"
    copyright_div = soup.find("div", class_="media__copyright-item")

    if copyright_div:
        text = copyright_div.find("a").get_text(strip=True)
        match = re.search(pattern, text)
        
        if match:
            return {"author": match.group(1)}

    return None
