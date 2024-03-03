export default function formFunc(formSelector) {
    // Form
    const form = document.querySelector(formSelector),
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
                showStatusMessage(message.successful)
            })
            .catch(() => showStatusMessage(message.failure))
            .finally(() => {
                form.reset()
                loader.remove()
            })
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
}