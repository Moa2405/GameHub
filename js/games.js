const gameContainer = document.querySelector(".game-container");

const getGamsAPI = async () => {
    try {
        const fetchGames = await fetch("https://api.rawg.io/api/games?key=00789cedfec649d583337ea2538e5185")

        const respons = await fetchGames.json()

        const games = respons.results;
        console.log(games)

        games.forEach(game => {
            gameContainer.innerHTML += `
                                            <div class="game-card">                    
                                                <img class="game-img" src="${game.background_image}" alt="">                                            
                                                <a class="game-name-link"href="game-detail.html?id=${game.id}">${game.name}</a>
                                                <button onclick="addItemToCart()" class="add-to-cart">Add to cart</button>
                                            </div>
                                        `;           
        });

    }
    catch(err) {
        console.log(err)
    }
} 

getGamsAPI()

const updateCartAmount = () => document.querySelector(".cart-count").innerHTML = localStorage.getItem("cart-count");
updateCartAmount()

total = 0
count = 0
const addItemToCart = () => {
    count ++
    total += 29.99
    localStorage.setItem("cart-count", count)
    localStorage.setItem("total-amount", total)
    document.querySelector(".cart-count").innerHTML = localStorage.getItem("cart-count")
}

