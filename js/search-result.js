const gameContainer = document.querySelector(".game-container");
const spinner = document.querySelector(".spinner");
const searcheader = document.querySelector(".content-header");

const params = new URLSearchParams(window.location.search);
const searchParam = params.get("search");

const baseUrl = "https://utviklermoa.no/gamehub/wp-json/wc/store/products";

const getSearchGames = async (url) => {
    try {
        const fetchSearchedGames = await fetch(url)
        const searchResult = await fetchSearchedGames.json()
    
        console.log(searchResult);

        searcheader.innerHTML = `<h1>Search result for: ${searchParam}</h1>`

        gameContainer.innerHTML = ""

        if (searchResult.length === 0) {
            gameContainer.innerHTML = `<h2" style="color: white;">No results for ${searchParam}</h2>`
        }
        else {
            for (let i = 0; i < searchResult.length; i++) {
                gameContainer.innerHTML += `<div class="game-card">
                                                <a class="img-wrapper-link"href="game-detail.html?id=${searchResult[i].id}">                   
                                                    <img class="game-img" src="${searchResult[i].images[0].src}" alt="${searchResult[i].name}">                                            
                                                </a>
                                                <a href="game-detail.html?id=${searchResult[i].id}"> 
                                                    <p class="game-name-link">${searchResult[i].name}</p>
                                                </a>
                                                <p>${searchResult[i].prices.price},-</p>
                                                <button onclick="addItemToCart()" class="add-to-cart">Add to cart</button>
                                            </div>`
            }

        }

    }
    catch(err) {
        console.log(err)
    }
    
}

getSearchGames(`${baseUrl}?search=${searchParam}&per_page=20`);