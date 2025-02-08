function slider(element, width, array, textElement) {
    let currentIndex = 0;

    function nextSlide() {
        if (currentIndex < array.length - 1) {
            currentIndex++;
            updateSlider();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }

    function updateSlider() {
        element.style.transform = `translateX(-${currentIndex * width}px)`;

        if (textElement) {
            textElement.textContent = `${currentIndex + 1}/ ${array.length}`;
        }
    }

    return {
        next: nextSlide,
        prev: prevSlide,
    };
}
function renderMenu(menuItems, menuSelector) {
    const menuContainer = document.querySelector(menuSelector);

    if (!menuContainer) {
        console.error(`Контейнер с селектором "${menuSelector}" не найден.`);
        return;
    }
    menuItems.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("sidebar-menu__nav__item");

        const a = document.createElement("a");
        a.href = item.href;
        a.classList.add("sidebar-menu__nav__link");

        const img = document.createElement("img");
        img.src = `assets/icons/${item.icon}.svg`;
        img.alt = item.icon;
        img.classList.add("sidebar-menu__nav__icon");

        a.appendChild(img);
        li.appendChild(a);
        menuContainer.appendChild(li);
    });
}

function renderSlides(container, slidesData, textElement) {
    slidesData.map((slide, index) => {
        const figure = document.createElement('figure');
        figure.className = 'slider__item';

        const img = document.createElement('img');
        img.src = slide.src;
        img.alt = slide.alt;

        figure.appendChild(img);

        if (slide.caption) {
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = slide.caption;
            figure.appendChild(figcaption);
        }

        textElement.textContent = `${1}/ ${slidesData.length}`;
        container.appendChild(figure);
    });
}

function renderPopular(containerId, data) {
    const container = document.querySelector(containerId);

    data.forEach((slide, index) => {
        const figure = document.createElement('figure');
        figure.className = "popular__container__content__item";

        const img = document.createElement('img');
        img.src = slide.src;
        img.alt = slide.alt;

        figure.appendChild(img);

        if (slide.caption) {
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = slide.caption;
            figure.appendChild(figcaption);
        }

        container.appendChild(figure);
    });
}



document.addEventListener("DOMContentLoaded", function () {
    renderMenu(MENUI_TEMS, ".sidebar-menu__nav");
    const sliderTrack = document.querySelector(".slider__wrapper");
    const prevButton = document.querySelector(".slider__control__action--prev");
    const nextButton = document.querySelector(".slider__control__action--next");
    const textElement = document.querySelector(".slider__control__action__info");
    renderSlides(sliderTrack, SLIDER_IMAGES, textElement)

    const slideWidth = innerWidth < 1440 ? innerWidth - 72 : 1368;

    const mySlider = slider(sliderTrack, slideWidth, SLIDER_IMAGES, textElement);
    prevButton.addEventListener("click", mySlider.prev);
    nextButton.addEventListener("click", mySlider.next);

    renderPopular(".popular__container__content", POPULAR_IMAGES)
    
});