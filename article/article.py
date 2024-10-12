import re


def find_article(soup):
    article_block = soup.find("div", class_="article__body")

    if article_block:
        text_blocks = article_block.find_all("div", class_="article__block")
        filtered_text_blocks = [
            div
            for div in text_blocks
            if div.find("div", class_="article__text")
            or div.find("div", class_="article__quote-text")
        ]
        article_text = "\n".join(
            [
                re.sub(r"\s+", " ", block.get_text(strip=True))
                for block in filtered_text_blocks
            ]
        )
        return {"text": article_text}
    else:
        return None
