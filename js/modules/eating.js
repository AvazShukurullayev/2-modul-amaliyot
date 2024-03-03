export default function eatingFunc(url, eatingSelector) {
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