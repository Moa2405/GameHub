const searchContainer = document.querySelector(".nav-search");
const searchInput = document.querySelector("#input-search");
const searchButton = document.querySelector(".search-button");


searchButton.addEventListener("click", function() {
    let searchValue = searchInput.value
    sessionStorage.setItem("param", searchValue);
    window.location = `search-result.html?search=${searchValue}`
})

searchInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        let searchValue = searchInput.value
        sessionStorage.setItem("param", searchValue);
        window.location = `search-result.html?search=${searchValue}`
    }
})







