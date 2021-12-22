const featuredGamesContainer = document.querySelector(".featured-games__container");

const featuredPostsApi = "https://utviklermoa.no/gamehub/wp-json/wc/store/products?featured=true";

const fetchFeaturedGames = async () => {
    try {

        const respons = await fetch(featuredPostsApi);
        const featuredGames = await respons.json();

        featuredGamesContainer.innerHTML = "";
       
        featuredGames.forEach((game) => {
            
            featuredGamesContainer.innerHTML += generateGameCard(game);
            
            const featuredCard = featuredGamesContainer.querySelectorAll(".gamehub-game-card__container");
            
            featuredCard.forEach((post) => {
                post.classList.add("featured-games-card");
            })
            
        })

        const addToCartBnts = document.querySelectorAll(".add-to-cart");

        addToCartBnts.forEach((bnt, index, game) => {

            game = games[index].id;

            bnt.onclick = (e) => {
                addItemToCart(game)
            }
        })
        
    }
    
    catch (err) {
        console.log(err)
        
    }
}

fetchFeaturedGames();