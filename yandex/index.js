let animationTickerStarted_1 = false;
let animationTickerStarted_2 = false;
let animationCarouselStarted = false;
let firstSectionAnimationLeft = false;
let firstSectionAnimationRight = false;
let carouselClickCreated = false;
let intervalId;
let resize = false;
let clickCarouselButtonSwitch = 1;

function ticker(container, started) {
    const containerWidth = container.clientWidth;
    const childWidth = container.scrollWidth;
    const childlength = container.textContent.length
    const diffWidths = containerWidth - childWidth
    let position = 0;

    function animate() {
        if (!started) { return }
        position -= 1;
        container.style.transform = `translateX(${position}px)`;
        if (position <= diffWidths) {
            if ((position <= diffWidths) && (childlength == container.textContent.length)) {
                container.innerHTML += `
                    <img src="./public/header/dot.svg" alt="dot">
                    Дело помощи утопающим — дело рук самих утопающих!
                    <img src="./public/header/dot.svg" alt="dot">
                    Шахматы двигают вперед не только культуру, но и экономику!
                    <img src="./public/header/dot.svg" alt="dot">
                    Лед тронулся, господа присяжные заседатели!
                    ` }

            if ((-position >= childWidth)) {
                position = 1;
                container.style.transform = `translateX(${position}px)`;
                container.textContent = container.textContent.substring(0, childlength)
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}
function scrollingHandler(tickers, animateRight, animateLeft, carouselAutoContainer) {
    let viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const delay = 300;
    const styles = {
        opacity: '1',
        translateX: 'translateX(0)'
    }

    if (carouselAutoContainer) {
        const carouselAutoContainerOffsetTop = carouselAutoContainer.offsetTop

        if (!resize && carouselAutoContainerOffsetTop <= (scrollY + viewportHeight)) {
            resize = true
            setupAutoCarousel(window.innerWidth);
        }
    }

    if (tickers.length > 0) {
        const tickerFirstOffsetTop = tickers[0].offsetTop
        const tickerSecondOffsetTop = tickers[1].offsetTop

        if (tickerFirstOffsetTop) {
            const height = tickers[0].offsetHeight;
            if (!animationTickerStarted_1 && tickerFirstOffsetTop <= (scrollY + viewportHeight) && (tickerFirstOffsetTop + height + viewportHeight) >= (scrollY + viewportHeight)) {
                animationTickerStarted_1 = true;
                ticker(tickers[0].firstElementChild, animationTickerStarted_1);
            } else if (animationTickerStarted_1 && ((scrollY + viewportHeight) <= tickerFirstOffsetTop || (tickerFirstOffsetTop + height + viewportHeight) <= (scrollY + viewportHeight))) {
                animationTickerStarted_1 = false;
            }
        }
        if (tickerSecondOffsetTop) {
            const height = tickers[1].offsetHeight;
            if (!animationTickerStarted_2 && tickerSecondOffsetTop <= (scrollY + viewportHeight) && (tickerSecondOffsetTop + height + viewportHeight) >= (scrollY + viewportHeight)) {
                animationTickerStarted_2 = true;
                ticker(tickers[1].firstElementChild, animationTickerStarted_2);
            } else if (animationTickerStarted_2 && ((scrollY + viewportHeight) <= tickerSecondOffsetTop || (tickerSecondOffsetTop + height + viewportHeight) <= (scrollY + viewportHeight))) {
                animationTickerStarted_2 = false;
            }
        }
    }

    if (animateRight.length > 0) {
        animateRight.forEach(element => {
            const elementOffsetTop = element.offsetTop;
            const opacity = window.getComputedStyle(element).opacity

            if (opacity == 0 && (scrollY + viewportHeight) >= elementOffsetTop && (elementOffsetTop + viewportHeight) <= (viewportHeight + scrollY)) {
                setTimeout(() => {
                    element.style.opacity = styles.opacity;
                    element.style.transform = styles.translateX;
                }, delay);
            }
        })
    }

    if (animateLeft.length > 0) {
        animateLeft.forEach(element => {
            const elementOffsetTop = element.offsetTop;
            const opacity = window.getComputedStyle(element).opacity

            if (opacity == 0 && (scrollY + viewportHeight) >= elementOffsetTop && (elementOffsetTop + viewportHeight) <= (viewportHeight + scrollY)) {
                setTimeout(() => {
                    element.style.opacity = styles.opacity;
                    element.style.transform = styles.translateX;
                }, delay);
            }
        })
    }
}
function changeText(viewportWidth, carouselClickchildren = null) {
    if (carouselClickchildren !== null) {
        carouselClickchildren.forEach(child => {
            child.classList.remove('hidden')
        })
        document.querySelector('.second-section-item-1').innerHTML = `<img class="digits" src="./public/digits/1.svg" alt="1">Строительство железнодорожной магистрали Москва-Васюки`
        document.querySelector('.second-section-item-4').innerHTML = `<img class="digits" src="./public/digits/4.svg" alt="4">Строительство дворца для турнира`
        return
    }

    const section_1_Item_1 = document.querySelector("#section-1-item-1");
    const section_1_Item_3 = document.querySelector("#split-text");

    if (viewportWidth > 768) {
        const insertText = 'Чтобы поддержать Международный&nbsp;васюкинский турнир посетите лекцию на тему: <span class="important-text common-text">«Плодотворная дебютная идея»</span>';
        section_1_Item_1.innerHTML = insertText;
        section_1_Item_3.innerHTML = ''

    } else if (viewportWidth <= 768) {
        const insertTextItem_1 = 'Чтобы поддержать Международный васюкинский турнир';
        const insertTextItem_3 = 'посетите лекцию на тему: <span class="important-text common-text">«Плодотворная дебютная идея»</span>'
        section_1_Item_1.innerHTML = insertTextItem_1;
        section_1_Item_3.innerHTML = insertTextItem_3;
    }
}
function carouselClick(event) {
    const btn = event.currentTarget;
    const parent = document.querySelector('#carousel-click');
    const children = Array.from(parent.children).filter((child) => !child.classList.contains('hidden'));
    const dots = document.querySelectorAll('.carousel-dots circle')

    function recoursion(child, direction) {
        if (direction === 'right') {
            parent.append(child)
            return
        }
        if (direction === 'left') {
            parent.insertBefore(child, parent.firstElementChild)
            return
        }
    }
    if (btn.id.toLowerCase() === 'to-right') {
        const firstChild = parent.firstElementChild;
        const nextChild = firstChild.nextElementSibling;

        if (firstChild.classList.contains('hidden')) {
            recoursion(firstChild, 'right')
        }
        if (nextChild.classList.contains('hidden')) {
            recoursion(nextChild, 'right')
        }
        if (!firstChild.classList.contains('hidden')) {
            recoursion(firstChild, 'right')
        }
        if (clickCarouselButtonSwitch < children.length) {
            dots[clickCarouselButtonSwitch].style.fill = '#313131';
            dots[clickCarouselButtonSwitch - 1].style.fill = '#D9D9D9';

            clickCarouselButtonSwitch += 1;
            document.querySelector('#to-left').disabled = false;
        }
        if (clickCarouselButtonSwitch >= children.length) {
            btn.disabled = true;
            clickCarouselButtonSwitch = children.length;
            return
        }

    }
    if (btn.id.toLowerCase() === 'to-left') {
        const lastChild = parent.lastElementChild;
        const previousChild = lastChild.previousElementSibling;
        if (lastChild.classList.contains('hidden')) {
            recoursion(lastChild, 'left')
        }
        if (previousChild.classList.contains('hidden')) {
            recoursion(previousChild, 'left')
        }
        if (!lastChild.classList.contains('hidden')) {
            recoursion(lastChild, 'left')
        }
        if (clickCarouselButtonSwitch > 1) {
            dots[clickCarouselButtonSwitch - 2].style.fill = '#313131';
            dots[clickCarouselButtonSwitch - 1].style.fill = '#D9D9D9';
            clickCarouselButtonSwitch -= 1
            document.querySelector('#to-right').disabled = false
        }
        if (clickCarouselButtonSwitch <= 1) {
            btn.disabled = true
            clickCarouselButtonSwitch = 1
            return
        }
    }
}
function carousels() {
    const viewportWidth = window.innerWidth;
    const carouselBtnContainer = document.querySelector('.carousel-btn-container');
    const dotsContainer = document.querySelector('#dots');
    const toRightBtn = document.querySelector('#to-right');
    const toLeftBtn = document.querySelector('#to-left');
    const carouselClickchildren = Array.from(document.querySelectorAll('#carousel-click > *'));

    if (viewportWidth > 768) {
        carouselBtnContainer.classList.add('hidden');
        toRightBtn.removeEventListener('click', carouselClick);
        toLeftBtn.removeEventListener('click', carouselClick);
        changeText(viewportWidth, carouselClickchildren);
        return
    } else if (viewportWidth <= 768 && !carouselClickCreated) {
        createCarouselClick(carouselClickchildren, carouselBtnContainer, dotsContainer);
        carouselClickCreated = true;
        toRightBtn.addEventListener('click', carouselClick);
        toLeftBtn.addEventListener('click', carouselClick);
        return
    } else if (viewportWidth <= 768 && dotsContainer.childElementCount > 0) {
        carouselClickResizeText(carouselClickchildren, carouselBtnContainer)
        toRightBtn.addEventListener('click', carouselClick);
        toLeftBtn.addEventListener('click', carouselClick);
        return
    }
}
function carouselClickResizeText(childrenArr, carouselBtnContainer) {
    if (childrenArr && childrenArr.length > 0) {
        childrenArr.forEach((child) => {

            carouselBtnContainer.classList.remove('hidden');

            if (child.classList.contains('second-section-item-1')) {
                child.innerHTML = `<img class="digits" src="./public/digits/1.svg" alt="1"><div class="carousel-first">Строительство железнодорожной магистрали Москва-Васюки</div><div class="digits-2"> <img class="digits" src="./public/digits/2.svg" alt="2">Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов</div>`
            }
            if (child.classList.contains('second-section-item-4')) {
                child.innerHTML = `<img class="digits" src="./public/digits/4.svg" alt="4"><div class="carousel-first">Строительство дворца для турнира</div><div class="digits-2"><img class="digits" src="./public/digits/5.svg" alt="5">Размещение гаражей для гостевого автотранспорта</div >`
            }
            if (child.classList.contains('second-section-item-2') || child.classList.contains('second-section-item-5')) {
                child.classList.add('hidden');
                return;
            }
        })
    }
}
function createCarouselClick(childrenArr, carouselBtnContainer, dotsContainer) {
    const DOTsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    DOTsvg.setAttribute("width", "10");
    DOTsvg.setAttribute("height", "10");
    DOTsvg.setAttribute("viewBox", "0 0 10 10");
    DOTsvg.setAttribute("fill", "none");
    DOTsvg.innerHTML = `<circle cx="5" cy="5" r="5" fill="#D9D9D9"/>`;
    DOTsvg.classList.add('carousel-dots');

    carouselClickResizeText(childrenArr, carouselBtnContainer)

    if (childrenArr && childrenArr.length > 0) {
        childrenArr.forEach((child, index) => {
            if (!child.classList.contains('hidden')) {
                const DOTClone = DOTsvg.cloneNode(true);
                dotsContainer.appendChild(DOTClone);
                if (index === 0) {
                    DOTClone.querySelector('circle').setAttribute('fill', '#313131');
                }
            }
        })
    }
}
function carouselAuto(carouselContainer, currentCardIndex, cardsLength, numVisibleCards, span, cardWidth) {
    function scrollCarousel() {
        if (currentCardIndex >= cardsLength - numVisibleCards) {
            span.textContent = numVisibleCards;
            currentCardIndex = 0;
        } else {
            currentCardIndex++;
            span.textContent = currentCardIndex + numVisibleCards;
        }

        const scrollAmount = currentCardIndex * cardWidth;

        carouselContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    intervalId = setInterval(scrollCarousel, 4000);
}
function setupAutoCarousel(viewportWidth) {
    const carouselContainer = document.querySelector('#carousel');
    const cards = Array.from(carouselContainer.querySelectorAll('.flex-col'));
    const cardsLength = cards.length;
    const span = document.querySelector('span.count');
    let currentCardIndex = 0;

    if (resize && intervalId) {
        clearInterval(intervalId);
        carouselContainer.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    }

    if (viewportWidth >= 1366) {
        const gap = 20;
        const numVisibleCards = 3;
        const cardWidth = cards[0].offsetWidth + gap;
        span.textContent = numVisibleCards;
        carouselAuto(carouselContainer, currentCardIndex, cardsLength, numVisibleCards, span, cardWidth);
    }
    if (768 < viewportWidth && viewportWidth < 1365) {
        const gap = 20;
        const numVisibleCards = 2;
        const cardWidth = cards[0].offsetWidth + gap;
        span.textContent = numVisibleCards;
        carouselAuto(carouselContainer, currentCardIndex, cardsLength, numVisibleCards, span, cardWidth);
    }
    if (viewportWidth <= 768) {
        const gap = 0;
        const numVisibleCards = 1;
        const cardWidth = cards[0].offsetWidth + gap;
        span.textContent = numVisibleCards;
        carouselAuto(carouselContainer, currentCardIndex, cardsLength, numVisibleCards, span, cardWidth);
    }
}
function start() {
    const tickers = Array.from(document.querySelectorAll('.ticker-container'));
    const animateRight = Array.from(document.querySelectorAll('.animate-right'));
    const animateLeft = Array.from(document.querySelectorAll('.animate-left'));
    const carouselAutoContainer = document.querySelector('#carousel');
    const viewportWidth = window.innerWidth;

    try {
        setTimeout(() => {
            scrollingHandler(tickers, animateRight, animateLeft, carouselAutoContainer);
        }, 100);

        changeText(viewportWidth);
    } catch (error) {
        console.error('An error occurred in the start function:', error);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    try {
        document.addEventListener('scroll', start);
        window.addEventListener('resize', () => {
            try {
                document.removeEventListener('scroll', start);
                document.addEventListener('scroll', start);
                carousels();
                resize = false;
            } catch (error) {
                console.error('An error occurred in the resize event listener:', error);
            }
        });
        carousels();
    } catch (error) {
        console.error('An error occurred during loaded:', error);
    }
});