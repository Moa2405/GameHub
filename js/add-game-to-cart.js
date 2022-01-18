

if (!window.localStorage.getItem("games")) {
    window.localStorage.setItem("games", "[]");
}

let gamesInCart = JSON.parse(window.localStorage.getItem("games")) 

document.querySelector(".cart-count").innerHTML = gamesInCart.length;

const addItemToCart = (game) => {

    if (!gamesInCart.includes(game)) {

        gamesInCart.push(game)

        document.querySelector(".cart-count").innerHTML = totalGamesInCart.length;
    }
    else {
        alert("Game already added to cart")
    }

    window.localStorage.setItem("games", JSON.stringify(gamesInCart))  
}

