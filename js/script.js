"use strict"
import tabsFunc from "./modules/tabs";
import loaderFunc from "./modules/loader";
import timerFunc from "./modules/timer";
import modalFunc, {openModal} from "./modules/modal";
import offerFunc from "./modules/offer";
import eatingFunc from "./modules/eating";
import specialFunc from "./modules/special";
import formFunc from "./modules/form";
// import sliderFunc from "./modules/slider";
import carouselFunc from "./modules/carousel";

window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 600000)
    tabsFunc(".tabheader__item", ".tabheader__items", ".tab_content")
    loaderFunc(".loader-wrapper")
    timerFunc("2024-04-01", ".timer")
    modalFunc("[data-modal]", ".modal", modalTimerId)
    offerFunc("http://localhost:3000/offers", ".offers-items")
    eatingFunc("http://localhost:3000/eating", ".daytime-items")
    specialFunc("http://localhost:3000/leftFoods", "http://localhost:3000/rightFood", ".menu-items-left", ".menu-items-right")
    formFunc("form", ".modal", modalTimerId)
    // sliderFunc()
    carouselFunc(".offer__slide", ".offer__slider-prev", ".offer__slider-next", "#current", "#total", ".offer__slider-wrapper", ".offer__slider-inner")
})