window.renderMenu = function (menuItems, menuSelector, text) {
    const menuContainer = document.querySelector(`.${menuSelector}`);

    if (!menuContainer) {
        console.error(`Контейнер с селектором "${menuSelector}" не найден.`);
        return;
    }
    menuItems.forEach(item => {
        const valueIcon = item.icon.split(".")[0]
        const li = document.createElement("li");
        li.classList.add(`${menuSelector}__item`);

        const a = document.createElement("a");
        a.href = item.href;
        a.classList.add(`${menuSelector}__link`);

        const img = document.createElement("img");
        img.src = `../assets/icons/${item.icon}.svg`;
        img.alt = item.icon;
        img.classList.add(`${menuSelector}__icon`);

        a.appendChild(img);
        li.appendChild(a);

        if (valueIcon === "Калькулятор") {
            li.addEventListener("click", toggleshowModal)
        }

        if (text) {
            const p = document.createElement("p");
            p.classList.add(`${menuSelector}__text`);
            p.textContent = valueIcon === "Калькулятор" ? "Калькулятор" : "Lorem"
            li.appendChild(p);
        }
        menuContainer.appendChild(li);
    });
}

window.renderSlides = function (container, slidesData, textElement) {
    slidesData.map((slide) => {
        const figure = document.createElement('figure');
        figure.className = 'slider__item';

        const img = document.createElement('img');
        if (innerWidth < 900 && slide.src.length > 1) {
            img.src = slide.src[1];
        } else {
            img.src = slide.src[0]
        }
        ;
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

window.renderPopular = function (containerId, data) {
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

window.renderSquares = function (count, elementId, sliderTrack) {
    const element = document.querySelector(`.${elementId}`);
    for (let i = 0; i < count; i++) {
        const square = document.createElement('span');
        square.className = `${elementId}-count  ${i === 0 ? "count-active" : ""}`.trim()
        element.appendChild(square);
        square.addEventListener("click", () => moveSlider(i, sliderTrack))
    }
}

window.renderProductCard = function (containerId, data, infoElement, countSlide) {
    const container = document.querySelector(`.${containerId}`);

    data.forEach((slide) => {
        const card = document.createElement('article');
        card.className = `${containerId}-card`;

        card.innerHTML = `
            <figure class=${containerId}-card-wrapper>
                <img src="${slide.image}" alt="${slide.title}" class="${containerId}-card-wrapper-image">
                <div class="${containerId}-card-wrapper-top-container">
                    <div class="${containerId}-card-wrapper-top-container-iconWrapper">
                        ${slide.transparency ? `<img src="../assets/icons/${slide.transparency}" alt="transparency">` : ""}
                        ${slide.composition ? `<img src="../assets/icons/${slide.composition}" alt="composition">` : ""}
                        ${slide.productWidth ? `<img src="../assets/icons/${slide.productWidth}" alt="productWidth">` : ""}
                    </div>
                    <div class="${containerId}-card-wrapper-top-container-discountInfo"><span>-${slide.discount}</span></div>
                </div>
                <div class="${containerId}-card-wrapper-bottom-container">
                     ${slide.colors.map(item => `
                <img src="../assets/backgroundImages/${item}" alt="Цвет"></img>
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
                        <img src="../assets/icons/cart.svg" alt="Cart Icon">
                    </aside>
                </div>
            </div>
        `;

        container.appendChild(card);

        infoElement.textContent = `${1}/${countSlide}`;
        // infoElement.textContent = `${Math.floor(width / (256 + 20))}/${data.length}`;
    });
}