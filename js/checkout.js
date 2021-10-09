const gameImgOne = document.querySelector(".game-img1")
const gameImgTwo = document.querySelector(".game-img2")
const gameNameOne = document.querySelector(".game-name1")
const gameNameTwo = document.querySelector(".game-name2")


const getGamsAPI = async () => {
    try {
        const fetchGames = await fetch("https://api.rawg.io/api/games?key=00789cedfec649d583337ea2538e5185")

        const respons = await fetchGames.json()

        const games = respons.results;
        console.log(games)

        gameImgOne.innerHTML = `<img src="${games[0].background_image}" alt="${games[0].name}">`
        gameImgTwo.innerHTML = `<img src="${games[1].background_image}" alt="${games[1].name}">`
        gameNameOne.innerHTML = `<p>${games[0].name}</p>`
        gameNameTwo.innerHTML = `<p>${games[1].name}</p>`

    }
    catch(err) {
        console.log(err)
    }
} 

getGamsAPI()


const shipmentForm = document.querySelector(".shipment-form");

const firstName = document.querySelector("#first-name");
const firstNameError = document.querySelector("#first-name-error");

const lastName = document.querySelector("#last-name");
const lastNameError = document.querySelector("#last-name-error");

const address = document.querySelector("#address");
const addressError = document.querySelector("#address-error");

const zipCode = document.querySelector("#zip-code");
const zipCodeError = document.querySelector("#zip-code-error");

const shipmentFormMessage = document.querySelector("#shipment-message");

const updateCartAmount = () => document.querySelector(".cart-count").innerHTML = localStorage.getItem("cart-count");

updateCartAmount()



const FormMessage = () => {
    if (checkLength(firstName.value, 2) && checkLength(lastName.value, 2) && validateAddress(address.value) && validateZipCode(zipCode.value)) {
        shipmentFormMessage.style.display = "block"
        shipmentFormMessage.style.backgroundColor = "green"
        shipmentFormMessage.innerHTML = `<p>Shipment information successfully submitet<p>`
    }else {
        shipmentFormMessage.style.display = "block"
        shipmentFormMessage.style.backgroundColor = "red"
        shipmentFormMessage.innerHTML = `<p>Shipment information not valid<p>`

    }
}

const checkLength = (value, len) => {
    if (value.trim().length >= len) {
        return true;
    } else {
        return false;
    }
}

const validateAddress = (address) => {
    const regEx = /^[a-zA-ZæøåÆØÅ0-9\ ]{2,20}$/;
    const patternMatches = regEx.test(address);
    return patternMatches;
}

const validateZipCode = (zipCode) => {
    const regEx = /^[0-9]{4}$/;
    const patternMatches = regEx.test(zipCode);
    return patternMatches;
}

shipmentForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (checkLength(firstName.value, 2)) {
        firstNameError.style.display = "none";
    }else {
        firstNameError.style.display = "block";
    }

    if (checkLength(lastName.value, 2)) {
        lastNameError.style.display = "none";
    }else {
        lastNameError.style.display = "block";
    }

    if (validateAddress(address.value)) {
        addressError.style.display = "none";
    }else {
        addressError.style.display = "block";
    }

    if (validateZipCode(zipCode.value)) {
        zipCodeError.style.display = "none";
    }else {
        zipCodeError.style.display = "block";
    }

    FormMessage()
})


const paymentForm = document.querySelector(".payment-form")

const cardHolderName = document.querySelector("#payment-name")
const cardHolderNameError = document.querySelector("#payment-name-error")

const cardNumber = document.querySelector("#card-no")
const cardNumbererror = document.querySelector("#card-no-error")

const cardCvc = document.querySelector("#card-cvc")
const cardCvcError = document.querySelector("#card-cvc-error")

const expiryDate = document.querySelector("#date")
const expiryDateError = document.querySelector("#expiry-date-error")

const paymentFormMessage = document.querySelector("#payment-message")


const validateCardNumber = (cardNo) => {
    const regEx = /^[0-9]{16}$/;
    const patternMatches = regEx.test(cardNo);
    return patternMatches;
}

const validateCvcNumber = (cvcNo) => {
    const regEx = /^[0-9]{3}$/;
    const patternMatches = regEx.test(cvcNo);
    return patternMatches;
}

const validateExpiryDate = (expiryDate) => {
    const regEx = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const patternMatches = regEx.test(expiryDate);
    return patternMatches;
}

const PaymentMessage = () => {
    if (checkLength(cardHolderName.value, 4) && validateCardNumber(cardNumber.value) && validateCvcNumber(cardCvc.value) && validateExpiryDate(expiryDate.value)) {
        document.location = "/checkout-success.html"
    }else {
        paymentFormMessage.style.display = "block"
        paymentFormMessage.style.backgroundColor = "red"
        paymentFormMessage.innerHTML = `<p>Shipment information not valid<p>`

    }
}

paymentForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (checkLength(cardHolderName.value, 4)) {
        cardHolderNameError.style.display = "none";
    }else {
        cardHolderNameError.style.display = "block";
    }

    if (validateCardNumber(cardNumber.value)) {
        cardNumbererror.style.display = "none";
    }else {
        cardNumbererror.style.display = "block";
    }

    if (validateCvcNumber(cardCvc.value)) {
        cardCvcError.style.display = "none";
    }else {
        cardCvcError.style.display = "block";
    }

    if (validateExpiryDate(expiryDate.value)) {
        expiryDateError.style.display = "none";
    }else {
        expiryDateError.style.display = "block";
    }

   

    PaymentMessage()
})








