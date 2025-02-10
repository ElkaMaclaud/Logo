window.slider = function (element, array, textElement, carts, margin = 66) {
    let currentIndex = 0;
    let widthContainer;
    let width;

    if (carts) {
        width = innerWidth < 1440 ? innerWidth - padding : 1290
        widthContainer = (array.length * (256 + margin)) - margin
    } else {
        width = innerWidth < 1440 ? innerWidth : 1368;
        widthContainer = array.length * width
    }

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
                shearWidth = currentIndex * width + (widthContainer - width * (currentIndex + 1)) + margin
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
            textElement.textContent = `${currentIndex + 1}/${Math.ceil(widthContainer / width)}`;
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