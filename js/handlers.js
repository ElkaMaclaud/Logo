window.toggleshowModal = function () {
    const modal = document.querySelector("#modal")
    if (modal && modal.style.display === "block") {
        modal.style.display = "none";
        const html = document.getElementsByTagName('html')[0]
        html.style.overflow = "visible";
        html.style.paddingRight = "0px"
        document.removeEventListener("click", (event) => handleClickOutside(event, modal));
    } else {
        const html = document.getElementsByTagName('html')[0]
        modal.style.display = "block";
        html.style.overflow = "hidden";
        if (innerWidth > 1440) {
            html.style.paddingRight = "17px"
        }
    }
    positionModal(modal);
}

window.positionModal = function (modal) {
    const windowHeight = innerHeight;
    const modalHeight = modal.offsetHeight;
    const topPosition = Math.max((windowHeight - modalHeight) / 2, 0);

    modal.style.top = `${topPosition}px`;
    modal.style.position = 'fixed';
}

window.toggleSidebarDetailed = function () {
    const sidebarDetailed = document.querySelector(".sidebar_detailed");
    if (!isSidebarOpen) {
        renderMenu(MENUI_TEMS, "sidebar_detailed-menu__nav", true);
        isSidebarOpen = true
    }
    if (sidebarDetailed) {
        if (sidebarDetailed.style.display === "flex") {
            sidebarDetailed.style.display = "none";
            document.removeEventListener("click", (event) => handleClickOutside(event, sidebarDetailed));
        } else {
            sidebarDetailed.style.display = "flex";
            document.addEventListener("click", (event) => handleClickOutside(event, sidebarDetailed));
        }
    }
}

window.handleClickOutside = function (event, element) {
    const isClickInsideElement = element.contains(event.target);
    const input = document.querySelector(".sidebar_detailed-search-container")
    const  inputClick = input.contains(event.target);

    if (isClickInsideElement && !inputClick) {
        element.style.display = "none";
        document.removeEventListener("click", (e) => handleClickOutside(e, element, buttonElement));
    }
}

window.widthCalculation = function(array, carts, margin) {
    let widthContainer;
    let width;
    if (carts) {
        let actualWidthContainer;
        let size = 4;
        widthContainer = (array.length * (256 + margin)) - margin
        if (innerWidth >= 1440) {
            width = 1290;       
        } else if (innerWidth > 1199) {
            actualWidthContainer = innerWidth - 216
            const count = Math.floor(actualWidthContainer / (256 + margin))
            width = (256 + margin) * count
            size = Math.ceil(widthContainer / width)
        } else {
            actualWidthContainer = innerWidth - padding
            const count = Math.floor(actualWidthContainer / (256 + margin))
            width = (256 + margin) * count
            size = Math.ceil(widthContainer / width)
        }
        return {width, widthContainer, size, actualWidthContainer}
    } else {
        if (innerWidth >= 1440) {
            width = 1368;
        } else if (innerWidth > 1199) {
            width = innerWidth - 72
        } else {
            width = innerWidth
        }
        widthContainer = array.length * width
        return {width, widthContainer}
    }
}
let startX;
let productSlider;
window.handleTouchStart = function (event) {
    if(!productSlider) {
        const margin = innerWidth < 1200 ? padding : 66
        const infoElement = document.querySelector(".best__offers__control__action__info");
        const productContainer = document.querySelector(".best__offers__products");
        productSlider = slider(productContainer, BEST_OFFERS, infoElement, true, margin);
    } 
    const touch = event.touches[0];
    startX = touch.clientX;
}

window.handleTouchEnd = function (event) {
    const touch = event.changedTouches[0];
    const endX = touch.clientX;

    const diffX = endX - startX;

    if (Math.abs(diffX) > 0) {
        if (diffX > 0) {
            productSlider.prev()
        } else {
            productSlider.next()
        }
    }
}