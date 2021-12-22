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

const inputSearch = document.querySelector("#input-search");

const baseUrl = "https://utviklermoa.no/gamehub/wp-json/wc/store/products";

const getGamsAPI = async (url) => {
    try {
        const fetchGames = await fetch(url);

        const games = await fetchGames.json();

        spinner.style.display = "none";

        games.forEach(game => {
            gameContainer.innerHTML += generateGameCard(game);           
        })

        const addToCartBnts = document.querySelectorAll(".add-to-cart");

        addToCartBnts.forEach((bnt, index, game) => {

            game = games[index].id;

            bnt.onclick = (e) => {
                e.target.innerHTML = "Item added to cart"
                addItemToCart(game)
            }
        })

    }
    catch(err) {
        spinner.style.display = "none";
        gameContainer.innerHTML += `<h3 style="color: white">Sorry, it seems we are having some server issues.<br>We are working to solve the problem</h3>`;
        console.log(err);
    }
} 
getGamsAPI(baseUrl);

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

    getGamsAPI(baseUrl + ascOrDescUrl + priceFilterUrl); 
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

    getGamsAPI(baseUrl + ascOrDescUrl + sortByTitle);
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
    
    getGamsAPI(baseUrl + categoryUrl);
}


perPage.onchange = (event) => {
    let newUrl = `${baseUrl}?per_page=${event.target.value}`;
    gameContainer.innerHTML = "";
    getGamsAPI(newUrl);
}






