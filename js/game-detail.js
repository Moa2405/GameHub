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
        
        gameDetalNav.innerHTML = gameDetail.name;


        document.title = "GameHub | " + gameDetail.name;

        spinner.style.display = "none";
            
        gameDetailContainerHTML.innerHTML = 
            `<div class="img-wrapper">
                <img class="detail-img" src="${gameDetail.images[0].src}" alt="${gameDetail.name}">
            </div>

            <div>
            
            <div class="game-detail-info-container">

                <div class="content-header">
                    <h1 class="detail-header">${gameDetail.name}</h1>
                </div>
       
                <p class="description">${gameDetail.short_description}</p>

                <div class="price">Price
                    ${gameDetail.prices.price}
                    $
                </div>

                <div>
                    <button>Add to cart</button>
                </div>

            </div>`;

            const addGameToCartBnt = gameDetailContainerHTML.querySelector("button");

            addGameToCartBnt.onclick = () => {

                game = gameDetail.id;

                addItemToCart(game);
            }

        const fetchRecomended = await fetch(`https://utviklermoa.no/gamehub/wp-json/wc/store/products?category=${gameDetail.categories[0].id}&per_page=5`)
        const recomendedGames = await  fetchRecomended.json()

        console.log(recomendedGames)

        const carouselConteiner = document.querySelector(".carousel");
        const carouselNavBntContainer = document.querySelector(".carousel__nav-bnt-container");
        const arrowPriv = document.querySelector(".carousel__btn--left");
        const arrowNext = document.querySelector(".carousel__btn--right");

        carouselConteiner.innerHTML = ""

        for(let i = 0; i < recomendedGames.length; i++ )  {

            if (recomendedGames[i].name === gameDetail.name ) {
                continue
            }
    
            carouselConteiner.innerHTML += ` 
                <figure class="carousel__content-container">
                    <a href="game-detail.html?id=${recomendedGames[i].id}">
                    
                        <img class="carousel-game-img" src="${recomendedGames[i].images[0].src}" alt="${recomendedGames[i].images[0].alt}">                                            

                        <div class="carousel__content">
                            <p class="game-name-link">${recomendedGames[i].name}</p>

                        </div>
                    </a>
                </figure>`;
        };

        carouselConteiner.firstElementChild.classList.add("slide-active");
        const slides = Array.from(carouselConteiner.children);
        const carouselContentContainer = document.querySelectorAll('.carousel__content-container');
        
        for (i = 0; i < slides.length; i++) {
            carouselNavBntContainer.innerHTML += `<button class="carousel__nav-bnt"></button>`;
        }
        
        const navBtn = document.querySelectorAll('.carousel__nav-bnt');
        
        carouselNavBntContainer.firstElementChild.classList.add("carousel__nav-bnt-active");
        
        
        const dislayNewSlide = (index) => {
            
            carouselContentContainer.forEach((slide) => {
                slide.classList.remove('slide-active');
                
                navBtn.forEach((btn) => {
                    btn.classList.remove('carousel__nav-bnt-active');
                });
                
            });
            
            carouselContentContainer[index].classList.add('slide-active');
            navBtn[index].classList.add('carousel__nav-bnt-active');
        }
        
        const hideShowArrows = (index) => {
            if (index === 0) {
                arrowPriv.classList.add("is-hidden");
                arrowNext.classList.remove("is-hidden");
            }
            else if (index === slides.length -1) {
                arrowNext.classList.add("is-hidden");
            }
            else {
                arrowNext.classList.remove("is-hidden");
                arrowPriv.classList.remove("is-hidden");
            }
        }
        
        arrowNext.onclick = () => {
            const currentPost = carouselConteiner.querySelector(".slide-active");
            const nextPost = currentPost.nextElementSibling;
            const indexOfSlide = slides.findIndex(post => post === nextPost);
            
            dislayNewSlide(indexOfSlide);
            
            hideShowArrows(indexOfSlide);
        }
        
        arrowPriv.onclick = () => {
            const currentPost = carouselConteiner.querySelector(".slide-active");
            const privPost = currentPost.previousElementSibling; 
            const indexOfSlide = slides.findIndex(post => post === privPost);
            
            dislayNewSlide(indexOfSlide);
            
            hideShowArrows(indexOfSlide);
        }
        
        navBtn.forEach((btn, index) => {
            btn.onclick = () => {
                
                dislayNewSlide(index);
                
                hideShowArrows(index);
            };
        });   
    }

    catch (err) {
        spinner.style.display = "none";
        gameDetailContainerHTML.innerHTML = `<h3 style="color: white">Sorry, it seems we are having some server issues.<br>We are working to solve the problem</h3>`;
        console.log(err)
    } 
}

getGameDetail()
