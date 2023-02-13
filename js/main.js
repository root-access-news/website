document.querySelector('.header_menu').addEventListener('click', function () {
    this.classList.toggle('--active')
    document.querySelector('.header_nav').classList.toggle('--active')
})