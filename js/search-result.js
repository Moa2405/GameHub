const gameContainer = document.querySelector(".game-container");
const spinner = document.querySelector(".spinner");
const categories = document.querySelector("#categories");
const perPage = document.querySelector("#per-page");
const priceFilterBnt = document.querySelector(".price-filter-bnt");
const priceFilterIcon = document.querySelector("#price-filter-icon");
const pagesNavigaterContainer = document.querySelector(".pages-container");
const sortByNameBnt = document.querySelector(".name-filter-bnt");
const filterContainer = document.querySelector(".filter-container");
const showFilterOptionsBtn = document.querySelector(".show-filter-options-btn");
const searchHeader = document.querySelector(".content-header");

const params = new URLSearchParams(window.location.search);
const searchParam = params.get("search");

const baseUrl = "https://utviklermoa.no/gamehub/wp-json/wc/store/products";

const getSearchGames = async (url) => {
    try {
        const fetchSearchedGames = await fetch(url)
        const searchResult = await fetchSearchedGames.json()

        searchHeader.innerHTML = `<h1>Search result for: ${searchParam}</h1>`

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

        const addToCartBnts = document.querySelectorAll(".add-to-cart");

        addToCartBnts.forEach((bnt, index, game) => {

            game = searchResult[index].id;

            bnt.onclick = (e) => {
                addItemToCart(game)
            }
        })

    }
    catch(err) {
        console.log(err)
    }
    
}

getSearchGames(`${baseUrl}?search=${searchParam}&per_page=20`);

showFilterOptionsBtn.addEventListener("click", function(){
    if (filterContainer.style.display === "none") {
        filterContainer.style.display = "block";
    }
    else {
        filterContainer.style.display = "none";
    }
})



priceFilterBnt.addEventListener("click", function(){
    let priceFilterUrl = "&orderby=price";
    let ascOrDescUrl;

    if (priceFilterIcon.classList.contains("fa-angle-down")) {
        priceFilterIcon.classList.remove("fa-angle-down");
        priceFilterIcon.classList.add("fa-angle-up");
        ascOrDescUrl = "?order=asc";
    }
    else {
        priceFilterIcon.classList.remove("fa-angle-up");
        priceFilterIcon.classList.add("fa-angle-down");
        ascOrDescUrl = "?order=desc";
    }
    gameContainer.innerHTML = "";

    getSearchGames(baseUrl + ascOrDescUrl + priceFilterUrl); 
})


sortByNameBnt.addEventListener("click", function() {
    let sortByTitle = "&orderby=title";
    let ascOrDescUrl;

    if (sortByNameBnt.classList.contains("asc")) {
        sortByNameBnt.classList.remove("asc");
        sortByNameBnt.classList.add("desc");
        ascOrDescUrl = "?order=asc";
    }
    else {
        sortByNameBnt.classList.remove("desc");
        sortByNameBnt.classList.add("asc");
        ascOrDescUrl = "?order=desc";
    }

    gameContainer.innerHTML = "";

    getSearchGames(baseUrl + ascOrDescUrl + sortByTitle);
})


categories.onchange = (event) => {
    let categoryUrl;
    if (categories.value === "featured") {
        categoryUrl = "?featured=true";
    }
    else {
        const catagoryChosen = event.target.value;
        categoryUrl = `?category=${catagoryChosen}`;
    }
    
    gameContainer.innerHTML = "";
    
    getSearchGames(baseUrl + categoryUrl);
}


perPage.onchange = (event) => {
    let newUrl = `${baseUrl}?per_page=${event.target.value}`;
    gameContainer.innerHTML = "";
    getSearchGames(newUrl);
}