const updateCartAmount = () => document.querySelector(".cart-count").innerHTML = localStorage.getItem("cart-count");
updateCartAmount()