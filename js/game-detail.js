const gameDetailContainerHTML = document.querySelector(".game-detail-container");
const hederHTML = document.querySelector(".detail-header");
const gameDetalNav = document.querySelector(".game-detail-nav");
const body = document.querySelector("body");
const spinner = document.querySelector(".spinner");



const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");


const getGameDetail = async () => {
    try {
        const fetchGameDetail = await fetch("https://utviklermoa.no/gamehub/wp-json/wc/store/products/" + gameId );
        const gameDetail = await fetchGameDetail.json();
        
        hederHTML.innerHTML = gameDetail.name;

        gameDetalNav.innerHTML = gameDetail.name;

        document.title = "GameHub | " + gameDetail.name;

        spinner.style.display = "none";
            
        
        gameDetailContainerHTML.innerHTML = `<div class="img-wrapper">
                                                <img class="detail-img" src="${gameDetail.images[0].src}" alt="${gameDetail.name}">
                                             </div>
                                             <h1 class="game-name">${gameDetail.name}</h1>

                                             <div class="game-detail-info-container">
                                                <div class="scroll-box">
                                                    <p class="description">${gameDetail.description}</p>
                                                </div>
                                                
                                                <div class="game-name-cart-button-container">
                                                    <p class="price">${gameDetail.prices.price},-<p>
                                                    <button onclick="addItemToCart()">Add to cart</button>
                                                </div>

                                             </div>`  
    }

    catch (err) {
        spinner.style.display = "none";
        gameDetailContainerHTML.innerHTML = `<h3 style="color: white">Sorry, it seems we are having some server issues.<br>We are working to solve the problem</h3>`;
        console.log(err)
    }
    
}

getGameDetail()


total = 0;
count = 0;
const addItemToCart = () => {
    count ++;
    total += 29.99;
    localStorage.setItem("cart-count", count);
    localStorage.setItem("total-amount", total);
    document.querySelector(".cart-count").innerHTML = localStorage.getItem("cart-count");
}