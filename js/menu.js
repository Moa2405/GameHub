
const burgerMenu = document.querySelector("div.burger i")
const nav = document.querySelector("nav")
const arrowBack = document.querySelector("div.arrow")

burgerMenu.addEventListener("click", function (event) {
    console.log("in")
    burgerMenu.style.display = "none"
    arrowBack.style.display = "block"
    nav.style.transform = "translate(0%)"
    
})

arrowBack.addEventListener("click", function (event) {
    console.log('out')
    burgerMenu.style.display = "block"
    arrowBack.style.display = "none"
    nav.style.transform = "translate(110%)"

    
})




