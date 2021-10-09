const gameDetailContainerHTML = document.querySelector(".game-detail-container");
const hederHTML = document.querySelector(".detail-header");
const gameDetalNav = document.querySelector(".game-detail-nav")
const body = document.querySelector("body");


const params = new URLSearchParams(window.location.search)
const gameId = params.get("id");



const getGameDetail = async () => {
    try {
        const fetchGameDetail = await fetch("https://api.rawg.io/api/games/" + gameId + "?key=00789cedfec649d583337ea2538e5185")
        const gameDetail = await fetchGameDetail.json()

        // console.log(gameDetail)

        console.log(gameDetail) 
        
        hederHTML.innerHTML = gameDetail.name;
        gameDetalNav.innerHTML = gameDetail.name
        document.title = "GameHub | " + gameDetail.name;
            
        
        gameDetailContainerHTML.innerHTML = `<div class="img-wrapper">
                                                <img class="detail-img" src="${gameDetail.background_image}" alt="${gameDetail.name}">
                                             </div>
                                             <h1 class="game-name">${gameDetail.name}</h1>

                                             <div class="game-detail-info-container">
                                                <div class="scroll-box">
                                                    <p class="description">${gameDetail.description_raw}</p>
                                                </div>
                                                
                                                <div class="game-name-cart-button-container">
                                                    <p class="price">$29.99<p>
                                                    <button onclick="addItemToCart()">Add to cart</button>
                                                </div>

                                             </div>`
                                            
                                        
                                            
                                            
        
    }
    catch (err) {
        console.log(err)
    }
    
}

getGameDetail()


total = 0
count = 0
const addItemToCart = () => {
    count ++
    total += 29.99
    localStorage.setItem("cart-count", count)
    localStorage.setItem("total-amount", total)
    document.querySelector(".cart-count").innerHTML = localStorage.getItem("cart-count")
}