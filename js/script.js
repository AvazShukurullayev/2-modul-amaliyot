"use strict"

window.addEventListener("DOMContentLoaded", () => {
    // Initialize
    const tabParent = document.querySelector(".tabheader__items"),
        tabs = tabParent.querySelectorAll(".tabheader__item"),
        tabContents = document.querySelectorAll(".tab_content")

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

    // Loader
    const loaderWrapper = document.querySelector(".loader-wrapper")

    setTimeout(() => {
        loaderWrapper.style.display = "none"
    }, 500)

    // Timer
    const deadline = "2024-04-01"

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

    // Modal
    const modalOpenBtns = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal")

    // modalCloseBtn = document.querySelector("[data-modal-close]")

    function openModal() {
        modal.classList.add("show", "fade")
        modal.classList.remove("hide")
        document.body.style.overflow = "hidden"
        clearTimeout(modalTimerId)
    }

    function closeModal() {
        modal.classList.add("hide")
        modal.classList.remove("show")
        document.body.style.overflow = ""
        clearTimeout(modalTimerId)
    }

    modalOpenBtns.forEach(btn => {
        btn.addEventListener("click", openModal)
    })

    // modalCloseBtn.addEventListener("click", closeModal)

    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.getAttribute("data-modal-close") === "") {
            closeModal()
        }
    })

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modal.classList.contains("show")) {
            closeModal()
        }
    })

    const modalTimerId = setTimeout(openModal, 600000)

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

    fetch("http://localhost:3000/offers", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
        .then((response) => response.json())
        .then((data) => {
            data.forEach(offer => {
                const {src, alt, title, description, discount, sale} = offer
                new OfferMenu(src, alt, title, description, discount, sale, ".offers-items").render()
            })
        })
        .catch((err) => console.log(err))
        .finally(() => console.log("Finally offers"))

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

    fetch("http://localhost:3000/eating", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
        .then((response) => response.json())
        .then((data) => {
            data.forEach(item => {
                const {src, alt, title, time} = item
                new EatingTime(src, alt, title, time, ".daytime-items").render()
            })
        })
        .catch((err) => console.log(err))
        .finally(() => console.log("Finally eating"))

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

    fetchSpecials("http://localhost:3000/leftFoods", ".menu-items-left")
    fetchSpecials("http://localhost:3000/rightFood", ".menu-items-right")
    // Form
    const form = document.querySelector("form"),
        telegramBotToken = "7019010563:AAFdy3Z56hkrcUT5xUb8I2KaE-h-cDDf_Ew",
        chatId = "826125853"

    const message = {
        loading: "Loading...",
        successful: "Thanks for contacting with us",
        failure: "Something went wrong"
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

        // fetch POST request
        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                chat_id: chatId,
                text: `Name: ${object.name}. Phone: +${object.phone}`
            })
        })
            .then(() => {
                form.reset()
                showStatusMessage(message.successful)
            })
            .catch(() => showStatusMessage(message.failure))
            .finally(() => loader.remove())
    })

    function showStatusMessage(message) {
        const modalDialog = document.querySelector(".modal__dialog")

        modalDialog.classList.add("hide")
        openModal()
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
            closeModal()
        }, 4500)
    }

    // Slider
    /*const slides = document.querySelectorAll(".offer__slide"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        currentSlide = document.querySelector("#current"),
        totalSlides = document.querySelector("#total")

    let slideIndex = 1

    if (slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`
        currentSlide.textContent = `0${slideIndex}`
    } else {
        totalSlides.textContent = `${slides.length}`
        currentSlide.textContent = slideIndex
    }

    function showSlides(index) {
        if (index > slides.length) {
            slideIndex = 1
        }
        if (index < 1) {
            slideIndex = slides.length
        }
        slides.forEach(slide => slide.style.display = "none")
        slides[slideIndex - 1].style.display = "block"

        if (slides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`
        } else {
            currentSlide.textContent = slideIndex
        }
    }

    function moveSlides(index) {
        showSlides(slideIndex += index)
    }

    next.addEventListener("click", () => {
        moveSlides(1)
    })

    prev.addEventListener("click", () => {
        moveSlides(-1)
    })

    showSlides(slideIndex)*/

    // Carousel
    const slides = document.querySelectorAll(".offer__slide"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        currentSlide = document.querySelector("#current"),
        totalSlides = document.querySelector("#total"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesInner = document.querySelector(".offer__slider-inner"),
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
        if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0
        } else {
            offset += +width.slice(0, width.length - 2)
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
            offset = +width.slice(0, width.length - 2) * (slides.length - 1) // 9900 -990
        } else {
            offset -= +width.slice(0, width.length - 2)
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

    // Todo: Call Functions
    hideTabContents()
    showTabContent()
    setClock(".timer", deadline)
})