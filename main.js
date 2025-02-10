document.addEventListener("DOMContentLoaded", function () {
    console.log(`Текущая ширина окна: ${innerWidth}px`);
    renderMenu(MENUI_TEMS, "sidebar-menu__nav");
    const sliderTrack = document.querySelector(".slider__wrapper");
    const prevButton = document.querySelector(".slider__control__action--prev");
    const nextButton = document.querySelector(".slider__control__action--next");
    const textElement = document.querySelector(".slider__control__action__info");
    renderSlides(sliderTrack, SLIDER_IMAGES, textElement)

    if(innerWidth < 900) {
        renderSquares(3, "slider__control-squares", sliderTrack)
    }
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