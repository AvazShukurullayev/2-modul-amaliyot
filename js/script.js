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
    }, 1500)

    // Timer
    const deadline = "2024-04-01"

    function getTimeRemaining(deadline) {
        let days, hours, minutes, seconds
        const time = Date.parse(deadline) - Date.parse(new Date())

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

    // Todo: Call Functions
    hideTabContents()
    showTabContent()
    setClock(".timer", deadline)
})