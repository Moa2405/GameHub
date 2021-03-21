const burgerMenu = document.querySelector("div.burger i")
const nav = document.querySelector("nav")
const arrowBack = document.querySelector("svg.arrow")

burgerMenu.addEventListener("click", function (event) {
    console.log("in")
    nav.style.transform = "translateX(0%)"
})

arrowBack.addEventListener("click", function (event) {
    console.log('out')
    nav.style.transform = "translateX(110%)"
})