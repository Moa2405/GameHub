const gameContainer = document.querySelector(".game-container");
const spinner = document.querySelector(".spinner");


const getGamsAPI = async () => {
    try {
        const fetchGames = await fetch("https://api.rawg.io/api/games?key=00789cedfec649d583337ea2538e5185")

        const respons = await fetchGames.json()

        const games = respons.results;
        spinner.style.display = "none"
        games.forEach(game => {
            gameContainer.innerHTML += `
                                        <div class="game-card">
                                            <a class="img-wrapper-link"href="game-detail.html?id=${game.id}">                   
                                                <img class="game-img" src="${game.background_image}" alt="">                                            
                                            </a>
                                            <a href="game-detail.html?id=${game.id}"> 
                                                <p class="game-name-link">${game.name}</p>
                                            </a>    
                                            <p>$29.99</p>
                                            <button onclick="addItemToCart()" class="add-to-cart">Add to cart</button>
                                        </div>
                                        `;           
        });

    }
    catch(err) {
        spinner.style.display = "none";
        gameContainer.innerHTML += `<h3 style="color: white">Sorry, it seems we are having some server issues.<br>We are working to solve the problem</h3>`;
        console.log(err)
    }
} 

getGamsAPI()

total = 0;
count = 0;
const addItemToCart = (event) => {
    console.log();
    count ++;
    total += 29.99;
    localStorage.setItem("cart-count", count);
    localStorage.setItem("total-amount", total);
    document.querySelector(".cart-count").innerHTML = localStorage.getItem("cart-count");
}


