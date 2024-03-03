export default function carouselFunc(slidesSelector, prevSelector, nextSelector, currentSlideSelector, totalSlidesSelector, slidesWrapperSelector, slidesInnerSelector) {
    // Carousel
    const slides = document.querySelectorAll(slidesSelector),
        prev = document.querySelector(prevSelector),
        next = document.querySelector(nextSelector),
        currentSlide = document.querySelector(currentSlideSelector),
        totalSlides = document.querySelector(totalSlidesSelector),
        slidesWrapper = document.querySelector(slidesWrapperSelector),
        slidesInner = document.querySelector(slidesInnerSelector),
        width = window.getComputedStyle(slidesWrapper).width

    let slideIndex = 1,
        offset = 0

    if (slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`
        currentSlide.textContent = `0${slideIndex}`
    } else {
        totalSlides.textContent = `${slides.length}`
        currentSlide.textContent = slideIndex
    }

    slidesInner.style.width = 100 * slides.length + "%"
    slidesInner.style.display = "flex"
    slidesInner.style.transition = "all 0.5s ease"
    slidesWrapper.style.overflow = "hidden"

    slides.forEach((slide) => {
        slide.style.width = width
    })

    next.addEventListener("click", (event) => {
        //Todo: shetta logikasiga yaxshi tushunmadim
        if (offset === +width.replace(/\D/g, "") * (slides.length - 1)) {
            offset = 0
        } else {
            offset += +width.replace(/\D/g, "")
        }
        slidesInner.style.transform = `translateX(-${offset}px)`

        if (slideIndex === slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }

        if (slides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`
        } else {
            currentSlide.textContent = `${slideIndex}`
        }
    })

    prev.addEventListener("click", (event) => {
        console.log("offset => ", offset)
        // Todo: shetta prev logikasiga yaxshilab tushunib olishim kere
        if (offset === 0) {
            offset = +width.replace(/\D/g, "") * (slides.length - 1) // 9900 -990
        } else {
            offset -= +width.replace(/\D/g, "")
        }
        slidesInner.style.transform = `translateX(-${offset}px)`

        if (slideIndex === 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        }

        if (slides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`
        } else {
            currentSlide.textContent = `${slideIndex}`
        }
    })
}