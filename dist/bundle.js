/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/carousel.js":
/*!********************************!*\
  !*** ./js/modules/carousel.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ carouselFunc)
/* harmony export */ });
function carouselFunc(slidesSelector, prevSelector, nextSelector, currentSlideSelector, totalSlidesSelector, slidesWrapperSelector, slidesInnerSelector) {
    // Carousel
    const slides = document.querySelectorAll(slidesSelector),
        prev = document.querySelector(prevSelector),
        next = document.querySelector(nextSelector),
        currentSlide = document.querySelector(currentSlideSelector),
        totalSlides = document.querySelector(totalSlidesSelector),
        slidesWrapper = document.querySelector(slidesWrapperSelector),
        slidesInner = document.querySelector(slidesInnerSelector),
        width = window.getComputedStyle(slidesWrapper).width

    let slideIndex = 1,
        offset = 0

    if (slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`
        currentSlide.textContent = `0${slideIndex}`
    } else {
        totalSlides.textContent = `${slides.length}`
        currentSlide.textContent = slideIndex
    }

    slidesInner.style.width = 100 * slides.length + "%"
    slidesInner.style.display = "flex"
    slidesInner.style.transition = "all 0.5s ease"
    slidesWrapper.style.overflow = "hidden"

    slides.forEach((slide) => {
        slide.style.width = width
    })

    next.addEventListener("click", (event) => {
        //Todo: shetta logikasiga yaxshi tushunmadim
        if (offset === +width.replace(/\D/g, "") * (slides.length - 1)) {
            offset = 0
        } else {
            offset += +width.replace(/\D/g, "")
        }
        slidesInner.style.transform = `translateX(-${offset}px)`

        if (slideIndex === slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }

        if (slides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`
        } else {
            currentSlide.textContent = `${slideIndex}`
        }
    })

    prev.addEventListener("click", (event) => {
        console.log("offset => ", offset)
        // Todo: shetta prev logikasiga yaxshilab tushunib olishim kere
        if (offset === 0) {
            offset = +width.replace(/\D/g, "") * (slides.length - 1) // 9900 -990
        } else {
            offset -= +width.replace(/\D/g, "")
        }
        slidesInner.style.transform = `translateX(-${offset}px)`

        if (slideIndex === 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        }

        if (slides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`
        } else {
            currentSlide.textContent = `${slideIndex}`
        }
    })
}

/***/ }),

/***/ "./js/modules/eating.js":
/*!******************************!*\
  !*** ./js/modules/eating.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ eatingFunc)
/* harmony export */ });
function eatingFunc(url, eatingSelector) {
    // CLass Eating Time
    class EatingTime {
        constructor(src, alt, title, time, parentSelector) {
            this.src = src
            this.alt = alt
            this.title = title
            this.time = time
            this.parent = document.querySelector(parentSelector)
        }

        render() {
            const element = document.createElement("div")
            element.classList.add("daytime-item")
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3>${this.title}</h3>
                <p>${this.time}</p>
            `
            this.parent.append(element)
        }
    }

    fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
        .then((response) => response.json())
        .then((data) => {
            data.forEach(item => {
                const {src, alt, title, time} = item
                new EatingTime(src, alt, title, time, eatingSelector).render()
            })
        })
        .catch((err) => console.log(err))
        .finally(() => console.log("Finally eating"))
}

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formFunc)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function formFunc(formSelector, modalSelector, modalTimerId) {
    // Form
    const form = document.querySelector(formSelector),
        telegramBotToken = "7019010563:AAFdy3Z56hkrcUT5xUb8I2KaE-h-cDDf_Ew",
        chatId = "826125853"

    const message = {
        loading: "Loading...",
        successful: "Thanks for contacting with us",
        failure: "Something went wrong"
    }

    async function sendMessage(loader, object) {
        try {
            await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Name: ${object.name}. Phone: +${object.phone}`
                })
            })
            showStatusMessage(message.successful)
        } catch (e) {
            showStatusMessage(message.failure)
        } finally {
            form.reset()
            loader.remove()
        }
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const loader = document.createElement("span")
        loader.classList.add("loader")
        loader.style.width = "30px"
        loader.style.height = "30px"
        loader.style.marginTop = "15px"
        form.append(loader)
        const formData = new FormData(form)
        const object = {}
        formData.forEach((value, key) => object[key] = value)
        console.log(object)

        // Async function fetch POST request
        sendMessage(loader, object)

        // fetch POST request
        /*fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                chat_id: chatId,
                text: `Name: ${object.name}. Phone: +${object.phone}`
            })
        })
            .then(() => {
                showStatusMessage(message.successful)
            })
            .catch(() => showStatusMessage(message.failure))
            .finally(() => {
                form.reset()
                loader.remove()
            })*/
    })


    function showStatusMessage(message) {
        const modalDialog = document.querySelector(".modal__dialog")

        modalDialog.classList.add("hide")
        ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector, modalTimerId)
        const statusModal = document.createElement("div")
        statusModal.classList.add("modal__dialog")
        statusModal.innerHTML = `
            <div class="modal__content">
                <div data-modal-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `
        document.querySelector(".modal").append(statusModal)

        setTimeout(() => {
            statusModal.remove()
            modalDialog.classList.remove("hide")
            ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector, modalTimerId)
        }, 4500)
    }
}

/***/ }),

/***/ "./js/modules/loader.js":
/*!******************************!*\
  !*** ./js/modules/loader.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loaderFunc)
/* harmony export */ });
function loaderFunc(loaderSelector){
    // Loader
    const loaderWrapper = document.querySelector(loaderSelector)

    setTimeout(() => {
        loaderWrapper.style.display = "none"
    }, 500)
}

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector)
    modal.classList.add("show", "fade")
    modal.classList.remove("hide")
    document.body.style.overflow = "hidden"
    clearTimeout(modalTimerId)
}

function closeModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector)
    modal.classList.add("hide")
    modal.classList.remove("show")
    document.body.style.overflow = ""
    clearTimeout(modalTimerId)
}

function modalFunc(modalOpenBtnsSelector, modalSelector, modalTimerId) {
    // Modal
    const modalOpenBtns = document.querySelectorAll(modalOpenBtnsSelector),
        modal = document.querySelector(modalSelector)

    // modalCloseBtn = document.querySelector("[data-modal-close]")

    modalOpenBtns.forEach(btn => {
        btn.addEventListener("click", () => openModal(modalSelector, modalTimerId))
    })

    // modalCloseBtn.addEventListener("click", closeModal)

    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.getAttribute("data-modal-close") === "") {
            closeModal(modalSelector, modalTimerId)
        }
    })

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector, modalTimerId)
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalFunc);


/***/ }),

/***/ "./js/modules/offer.js":
/*!*****************************!*\
  !*** ./js/modules/offer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ offerFunc)
/* harmony export */ });
/* harmony import */ var _services_get_resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/get-resources */ "./js/services/get-resources.js");


function offerFunc(url, offerSelector) {
    // Class Offer Menu
    class OfferMenu {
        constructor(src, alt, title, description, discount, sale, parentSelector) {
            this.src = src
            this.alt = alt
            this.title = title
            this.description = description
            this.discount = discount
            this.sale = sale
            this.parent = document.querySelector(parentSelector)
            this.formatToUSD()
        }

        formatToUSD() {
            this.discount = this.discount.toLocaleString("en-US", {style: "currency", currency: "USD"})
            this.sale = this.sale.toLocaleString("en-US", {style: "currency", currency: "USD"})
        }

        render() {
            // nimadurni website qoyib qoyamiz
            const element = document.createElement("div")
            element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
                 <div>
                    <h3>${this.title}</h3>
                    <p>${this.description}</p>
                    <p>
                        <del>${this.discount}</del>
                        <span class="primary-text">${this.sale}</span>
                    </p>
                 </div>
            `

            this.parent.append(element)
        }
    }

    // getResources
    // getResources(url)
    //     .then((data) => {
    //         data.forEach(offer => {
    //             const {src, alt, title, description, discount, sale} = offer
    //             new OfferMenu(src, alt, title, description, discount, sale, offerSelector).render()
    //         })
    //     })

    fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
        .then((response) => response.json())
        .then((data) => {
            data.forEach(offer => {
                const {src, alt, title, description, discount, sale} = offer
                new OfferMenu(src, alt, title, description, discount, sale, offerSelector).render()
            })
        })
        .catch((err) => console.log(err))
        .finally(() => console.log("Finally offers"))
}

/***/ }),

/***/ "./js/modules/special.js":
/*!*******************************!*\
  !*** ./js/modules/special.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ specialFunc)
/* harmony export */ });
function specialFunc(urlLeftSide, urlRightSide, leftSideSelector, rightSideSelector) {
    // Class specialMenu
    class Specials {
        constructor(src, alt, title, price, description, parentSelector) {
            this.src = src
            this.alt = alt
            this.title = title
            this.price = price
            this.description = description
            this.parent = document.querySelector(parentSelector)
            this.convertToUSD()
        }

        convertToUSD() {
            this.price = this.price.toLocaleString("en-US", {style: "currency", currency: "USD"})
        }

        render() {
            const element = document.createElement("div")
            element.classList.add("menu-item")
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <div>
                    <h3>${this.title} <span class="primary-text">${this.price}</span></h3>
                    <p>${this.description}</p>
                </div>
            `
            this.parent.append(element)
        }
    }

    function fetchSpecials(url, parentSelector) {
        fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
            .then((response) => response.json())
            .then((data) => {
                data.forEach(item => {
                    const {src, alt, title, price, description} = item
                    new Specials(src, alt, title, price, description, parentSelector).render()
                })
            })
            .catch((err) => console.log(err))
            .finally(() => console.log("Finally Specials"))
    }

    fetchSpecials(urlLeftSide, leftSideSelector)
    fetchSpecials(urlRightSide, rightSideSelector)
}

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tabsFunc)
/* harmony export */ });
function tabsFunc(tabsSelector, tabParentSelector, tabContentsSelector) {
    // Initialize
    const tabs = document.querySelectorAll(tabsSelector),
        tabParent = document.querySelector(tabParentSelector),
        tabContents = document.querySelectorAll(tabContentsSelector);

    // hideTabContents
    function hideTabContents() {
        tabContents.forEach(item => {
            item.classList.add("hide")
            item.classList.remove("show")
        })
        tabs.forEach(item => item.classList.remove("tabheader__item_active"))
    }

    function showTabContent(index = 0) {
        tabContents[index].classList.add("show", "fade")
        tabContents[index].classList.remove("hide")
        tabs[index].classList.add("tabheader__item_active")
    }

    tabParent.addEventListener("click", (event) => {
        // delegirovaniye
        const target = event.target
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((tab, index) => {
                if (target === tab) {
                    hideTabContents()
                    showTabContent(index)
                }
            })
        }
    })
    hideTabContents()
    showTabContent()
}

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ timerFunc)
/* harmony export */ });
function timerFunc(deadline, timerSelector) {
    // Timer

    function getTimeRemaining(deadline) {
        let days, hours, minutes, seconds
        const now = String(new Date())
        const time = Date.parse(deadline) - Date.parse(now)

        if (time <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24))
            hours = Math.floor(time / (1000 * 60 * 60) % 24)
            minutes = Math.floor(time / (1000 * 60) % 60)
            seconds = Math.floor(time / (1000) % 60)
        }

        return {
            totalTime: time,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function formatNumber(number) {
        if (0 <= number && number < 10) {
            return `0${number}`
        } else {
            return number
        }
    }

    function setClock(selector, deadline) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            interval = setInterval(() => updateTime(deadline), 1000)
        updateTime(deadline)

        function updateTime(deadline) {
            const time = getTimeRemaining(deadline)
            days.innerHTML = formatNumber(time.days)
            hours.innerHTML = formatNumber(time.hours)
            minutes.innerHTML = formatNumber(time.minutes)
            seconds.innerHTML = formatNumber(time.seconds)

            if (time.totalTime <= 0) {
                clearInterval(interval)
            }
        }
    }

    setClock(timerSelector, deadline)
}

/***/ }),

/***/ "./js/services/get-resources.js":
/*!**************************************!*\
  !*** ./js/services/get-resources.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getResources)
/* harmony export */ });
async function getResources(url) {
    try {
        const response = await fetch(url)
        return await response.json()
    } catch (e) {
        console.log("Error => ", e)
    } finally {
        console.log("Finally getResources()")
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/loader */ "./js/modules/loader.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_offer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/offer */ "./js/modules/offer.js");
/* harmony import */ var _modules_eating__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/eating */ "./js/modules/eating.js");
/* harmony import */ var _modules_special__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/special */ "./js/modules/special.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_carousel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/carousel */ "./js/modules/carousel.js");

;







// import sliderFunc from "./modules/slider";


window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)(".modal", modalTimerId), 600000)
    ;(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabheader__items", ".tab_content")
    ;(0,_modules_loader__WEBPACK_IMPORTED_MODULE_1__["default"])(".loader-wrapper")
    ;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])("2024-04-01", ".timer")
    ;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])("[data-modal]", ".modal", modalTimerId)
    ;(0,_modules_offer__WEBPACK_IMPORTED_MODULE_4__["default"])("http://localhost:3000/offers", ".offers-items")
    ;(0,_modules_eating__WEBPACK_IMPORTED_MODULE_5__["default"])("http://localhost:3000/eating", ".daytime-items")
    ;(0,_modules_special__WEBPACK_IMPORTED_MODULE_6__["default"])("http://localhost:3000/leftFoods", "http://localhost:3000/rightFood", ".menu-items-left", ".menu-items-right")
    ;(0,_modules_form__WEBPACK_IMPORTED_MODULE_7__["default"])("form", ".modal", modalTimerId)
    // sliderFunc()
    ;(0,_modules_carousel__WEBPACK_IMPORTED_MODULE_8__["default"])(".offer__slide", ".offer__slider-prev", ".offer__slider-next", "#current", "#total", ".offer__slider-wrapper", ".offer__slider-inner")
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map