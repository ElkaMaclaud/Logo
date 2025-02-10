function renderMenu(menuItems, menuSelector) {
    const menuContainer = document.querySelector(`.${menuSelector}`);

    if (!menuContainer) {
        console.error(`Контейнер с селектором "${menuSelector}" не найден.`);
        return;
    }
    menuItems.forEach(item => {
        const li = document.createElement("li");
        li.classList.add(`${menuSelector}__item`);

        const a = document.createElement("a");
        a.href = item.href;
        a.classList.add(`${menuSelector}__link`);

        const img = document.createElement("img");
        img.src = `assets/icons/${item.icon}.svg`;
        img.alt = item.icon;
        img.classList.add(`${menuSelector}__icon`);

        a.appendChild(img);
        li.appendChild(a);
        menuContainer.appendChild(li);
    });
}

function renderSlides(container, slidesData, textElement) {
    slidesData.map((slide) => {
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

        textElement.textContent = `${1}/${slidesData.length}`;
        container.appendChild(figure);
    });
}

function renderPopular(containerId, data) {
    const container = document.querySelector(`.${containerId}`);

    data.forEach((slide) => {
        const figure = document.createElement('figure');
        figure.className = `${containerId}__item`;

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

function renderProductCard(containerId, data, infoElement, countSlide) {
    const container = document.querySelector(`.${containerId}`);

    data.forEach((slide) => {
        const card = document.createElement('article');
        card.className = `${containerId}-card`;

        card.innerHTML = `
            <figure class=${containerId}-card-wrapper>
                <img src="${slide.image}" alt="${slide.title}" class="${containerId}-card-wrapper-image">
                <div class="${containerId}-card-wrapper-top-container">
                    <div class="${containerId}-card-wrapper-top-container-iconWrapper">
                        ${slide.transparency ? `<img src="assets/icons/${slide.transparency}" alt="transparency">` : ""}
                        ${slide.composition ? `<img src="assets/icons/${slide.composition}" alt="composition">` : ""}
                        ${slide.productWidth ? `<img src="assets/icons/${slide.productWidth}" alt="productWidth">` : ""}
                    </div>
                    <div class="${containerId}-card-wrapper-top-container-discountInfo"><span>-${slide.discount}</span></div>
                </div>
                <div class="${containerId}-card-wrapper-bottom-container">
                     ${slide.colors.map(item => `
                <img src="assets/backgroundImages/${item}" alt="Цвет"></img>
            `).join('')}
                </div>
            </figure>
            <div class="${containerId}-card-info">
                <div class="${containerId}-card-title-container">
                    <figcaption class="${containerId}-card-title">${slide.title}</figcaption>
                </div>
                <div class="${containerId}-card-details-container">
                    <div class="${containerId}-card-info-price-container">
                        <span class="${containerId}-card-info-price">от<span> ${slide.price}&#x20BD;</span></span>
                        <span class="${containerId}-card-info-old-price">${slide.oldPrice}&#x20BD;</span>
                    </div>
                    <aside class="${containerId}-card-info-button-container">
                        <button class="${containerId}-card-info-button">ОФОРМИТЬ ЗАЯВКУ</button>
                        <img src="/assets/icons/cart.svg" alt="Cart Icon">
                    </aside>
                </div>
            </div>
        `;

        container.appendChild(card);

        infoElement.textContent = `${1}/${countSlide}`;
        // infoElement.textContent = `${Math.floor(width / (256 + 20))}/${data.length}`;
    });
}

function showModal() {
    const modal = document.querySelector("#modal")
    const html = document.getElementsByTagName('html')[0]
    html.style.overflow = "hidden";
    html.style.paddingRight = "17px"
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.querySelector("#modal")
    modal.style.display = "none";
    const html = document.getElementsByTagName('html')[0]
    html.style.overflow = "visible";
    html.style.paddingRight = "0px"
}

document.addEventListener("DOMContentLoaded", function () {
    console.log(`Текущая ширина окна: ${innerWidth}px`);
    renderMenu(MENUI_TEMS, "sidebar-menu__nav");
    const sliderTrack = document.querySelector(".slider__wrapper");
    const prevButton = document.querySelector(".slider__control__action--prev");
    const nextButton = document.querySelector(".slider__control__action--next");
    const textElement = document.querySelector(".slider__control__action__info");
    renderSlides(sliderTrack, SLIDER_IMAGES, textElement)

    const imageSlider = slider(sliderTrack, SLIDER_IMAGES, textElement);
    prevButton.addEventListener("click", imageSlider.prev);
    nextButton.addEventListener("click", imageSlider.next);

    renderPopular("popular__container__content", POPULAR_IMAGES)
    const infoElement = document.querySelector(".best__offers__control__action__info");
    const bestOffersNextButton = document.querySelector(".best__offers__control__action--prev");
    const bestOffersPrevtButton = document.querySelector(".best__offers__control__action--next");

    const width = innerWidth < 1440 ? innerWidth - padding : 1290
    const margin = innerWidth < 1440 ? padding : 66
    const widthContainer = (BEST_OFFERS.length * (256 + margin)) - margin
    const countSlide = Math.ceil(widthContainer / width)

    renderProductCard("best__offers__products", BEST_OFFERS, infoElement, countSlide)
    const productContainer = document.querySelector(".best__offers__products");
    const productSlider = slider(productContainer, BEST_OFFERS, infoElement, true, margin);
    bestOffersNextButton.addEventListener("click", productSlider.prev);
    bestOffersPrevtButton.addEventListener("click", productSlider.next);
});
function handleResize() {
    location.reload()
}
addEventListener('resize', handleResize);