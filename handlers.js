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

    if (isClickInsideElement) {
        element.style.display = "none";
        document.removeEventListener("click", (e) => handleClickOutside(e, element, buttonElement));
    }
}