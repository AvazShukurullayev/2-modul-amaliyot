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

export default modalFunc
export {openModal, closeModal}