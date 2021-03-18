const navMenu = document.querySelector('div.nav-menu');
const menuBlur = document.querySelector('div.menu-blur');
const menuBlack = document.querySelector('div.menu-balck')
const menuArrow = document.querySelector('svg.arrow');




navMenu.addEventListener('click', function() {
    console.log("menu inn")
    menuBlur.style.display = "block"
    menuBlack.style.transform = "translateX(0px)"
});

menuBlur.addEventListener("click", function() {
    console.log("menu out")
    menuBlur.style.display = "none"
    menuBlack.style.transform = "translateX(190px)"
})

menuArrow.addEventListener('click', function() {
    console.log("menu out")
    menuBlur.style.display = "none"
    menuBlack.style.transform = "translateX(190px)"
    
})