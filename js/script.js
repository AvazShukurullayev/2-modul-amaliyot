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

    const offers = [
        {
            src: "./img/offer1.png",
            alt: "Quattro Pasta",
            title: "Quattro Pasta",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
            discount: 50,
            sale: 20
        },
        {
            src: "./img/offer2.png",
            alt: "Vegertarian Pasta",
            title: "Vegertarian Pasta",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
            discount: 65,
            sale: 25
        },
        {
            src: "./img/offer3.png",
            alt: "Gluten-Free Pasta",
            title: "Gluten-Free Pasta",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
            discount: 75,
            sale: 10
        }
    ]

    offers.forEach(offer => {
        const {src, alt, title, description, discount, sale} = offer
        new OfferMenu(src, alt, title, description, discount, sale, ".offers-items").render()
    })

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

    const eating = [
        {
            src: "./img/breckfastIcon.png",
            alt: "Breakfast",
            title: "Breakfast",
            time: "8:00 am to 10:00 am"
        },
        {
            src: "./img/lunchIcon.png",
            alt: "Lunch",
            title: "Lunch",
            time: "4:00 pm to 7:00 pm"
        },
        {
            src: "./img/dinnerIcon.png",
            alt: "Dinner",
            title: "Dinner",
            time: "9:00 pm to 01:00 am"
        },
        {
            src: "./img/dessertIcon.png",
            alt: "dessert",
            title: "Dessert",
            time: "All day"
        },
    ]

    eating.forEach(item => {
        const {src, alt, title, time} = item
        new EatingTime(src, alt, title, time, ".daytime-items").render()
    })

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

    // Todo: Call Functions
    hideTabContents()
    showTabContent()
    setClock(".timer", deadline)
})