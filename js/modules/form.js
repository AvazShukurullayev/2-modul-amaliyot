import {closeModal, openModal} from "./modal";

export default function formFunc(formSelector, modalSelector, modalTimerId) {
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
        openModal(modalSelector, modalTimerId)
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
            closeModal(modalSelector, modalTimerId)
        }, 4500)
    }
}