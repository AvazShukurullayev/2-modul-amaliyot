export default  function loaderFunc(loaderSelector){
    // Loader
    const loaderWrapper = document.querySelector(loaderSelector)

    setTimeout(() => {
        loaderWrapper.style.display = "none"
    }, 500)
}