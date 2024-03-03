export default function timerFunc(deadline, timerSelector) {
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