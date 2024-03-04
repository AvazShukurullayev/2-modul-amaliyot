import getResources from "../services/get-resources";

export default function offerFunc(url, offerSelector) {
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