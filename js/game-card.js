

const generateGameCard = (game) => {
    return `
        <div class="game-card">
            <a class="img-wrapper-link"href="game-detail.html?id=${game.id}">                   
                <img class="game-img" src="${game.images[0].src}" alt="${game.name}">                                            
            </a>
            <a href="game-detail.html?id=${game.id}"> 
                <p class="game-name-link">${game.name}</p>
            </a>
            <div class="short-description-wrapper">
                <a href="game-detail.html?id=${game.id}"> 
                    ${game.short_description}
                </a>    
            </div>
            <p class="price">${game.prices.price},-</p>
            <button class="add-to-cart">Add to cart</button>
        </div>
        `;
}