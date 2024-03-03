export default function sliderFunc() {
    // Slider
    const slides = document.querySelectorAll(".offer__slide"),
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

    showSlides(slideIndex)
}