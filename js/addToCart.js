const itemsInCartCountHTML = document.querySelector(".cart-count");
const addToCartButton = document.querySelector("button");
console.log(addToCartButton)
// const updateCartCount = () => {
//     const cartCount = localStorage.getItem("numberOfitemsInCart");
//     itemsInCartCountHTML.innerHTML = cartCount;
// }

// updateCartCount()


let count = 0;
let total = 0

addToCartButton.addEventListener("onclick", () => {
    count ++;
    total += 29.99
    itemsInCartCountHTML.innerHTML = `${count}`;
    localStorage.setItem("numberOfitemsInCart", count);
    localStorage.setItem("totalAmountInCart", total);
})








