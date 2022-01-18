

if (!window.localStorage.getItem("games")) {
    window.localStorage.setItem("games", "[]");
}

let gamesInCart = JSON.parse(window.localStorage.getItem("games")) 

document.querySelector(".cart-count").innerHTML = gamesInCart.length;



const addItemToCart = (game) => {

    if (!gamesInCart.includes(game)) {

        gamesInCart.push(game)
    }
    else {
        alert("game already added to cart")
    }

    window.localStorage.setItem("games", JSON.stringify(gamesInCart))
    
    let totalGamesInCart = JSON.parse(window.localStorage.getItem("games"))
    
    document.querySelector(".cart-count").innerHTML = totalGamesInCart.length;
}

