export default function specialFunc(urlLeftSide, urlRightSide, leftSideSelector, rightSideSelector) {
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