window.slider = function (element, array, textElement, carts, margin) {
    let currentIndex = 0;

    const { width, widthContainer, size, actualWidthContainer } = widthCalculation(array, carts, margin)

    function nextSlide() {
        moveSlider("increment", width, widthContainer);
    }

    function prevSlide() {
        moveSlider("decrement", width, widthContainer);
    }

    function moveSlider(operator, width, widthContainer) {
        let shearWidth;
        if (operator === "increment") {
            if (width <= Math.abs(widthContainer - width * (currentIndex + 1))) {
                currentIndex++
                shearWidth = currentIndex * width
            } else if (widthContainer - width * (currentIndex + 1) > 0) {
                const baseWidth = actualWidthContainer || width;
                shearWidth = currentIndex * baseWidth + widthContainer - baseWidth * (currentIndex + 1) + (actualWidthContainer ? 0 : margin);
                currentIndex++
            } else { return };
        } else {
            if (width * (currentIndex - 1) >= 0) {
                currentIndex--
                shearWidth = currentIndex * width
            } else return;
        }
        element.style.transform = `translateX(-${shearWidth}px)`;
        if (textElement) {
            textElement.textContent = `${currentIndex + 1}/${size || Math.ceil(widthContainer / width)}`;
        }
    }

    return {
        next: nextSlide,
        prev: prevSlide,
    }
}

window.moveSlider = function (count, sliderTrack) {
    const squaresElements = document.querySelectorAll(".slider__control-squares-count")
    sliderTrack.style.transform = `translateX(-${count * innerWidth}px)`;
    squaresElements.forEach((square, index) => {
        square.classList.remove("count-active");
        if (index === count) {
            square.classList.add("count-active");
        }
    });
}