const carouselConteiner = document.querySelector(".carousel");
const carouselNavBntContainer = document.querySelector(".carousel__nav-bnt-container");

const arrowPriv = document.querySelector(".carousel__btn--left");
const arrowNext = document.querySelector(".carousel__btn--right");

const apiEndPoint = "https://utviklermoa.no/gamehub/wp-json/wc/store/products?featured=true";

const fetchLatestPosts = async () => {
    try {

        const respons = await fetch(apiEndPoint);
        const results = await respons.json();
        const featuredGames = results;

        console.log(featuredGames)


        featuredGames.forEach((game) =>  {
    
            carouselConteiner.innerHTML += ` 
                <figure class="carousel__content-container">
                    <a href="game-detail.html?id=${game.id}">
                    
                        <img class="carousel-game-img" src="${game.images[0].src}" alt="${game.images[0].alt}">                                            

                        <div class="carousel__content">
                            <p class="game-name-link">${game.name}</p>

                        </div>
                    </a>
                </figure>`
            ;
        });
        
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
        console.log(err);
        

    }
}

fetchLatestPosts();





