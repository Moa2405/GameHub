const checkoutGmamesContainer = document.querySelector(".checkout-games-container");

const checkoutGames = window.localStorage.getItem("games");

const formatedCheckoutGames = JSON.parse(checkoutGames);

if (formatedCheckoutGames.length === 0) {
    checkoutGmamesContainer.innerHTML = `<p>Yor shopping cart is empty<p>`;

    document.querySelector(".shipment-payment-container").style.display = "none"
}
else {
    checkoutGmamesContainer.innerHTML = "";
}

formatedCheckoutGames.forEach((gameId) => {

    const getCheckoutGames = async () => {

        try {
    
            const respons = await fetch(`https://utviklermoa.no/gamehub/wp-json/wc/store/products/${gameId}`);
    
            const result = await respons.json();            

            checkoutGmamesContainer.innerHTML += `
                <div class="checkout-game-card">
                    <div class="checkout-game-info">
                        <div class="checkout-img-container">
                            <img class="checkout-game-img" src="${result.images[0].src}" alt="${result.name}">
                        </div>
                        <p class="checkout-game-name">${result.name}</p>
                    </div>
                    <div class="checkout-info">
                        <p class="game-price">$ ${result.prices.price}</p>

                        <div class="game-quant">
                            <input value="1" type="number" class="amount-of-game">
                        </div>

                        <div class="trach">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>

                </div>
            `;

        }
        
        catch (err) {
            console.log(err);
        }
    } 
    getCheckoutGames()    
})



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

const paymentButton = document.querySelector(".payment-button");


const FormMessage = () => {
    if (checkLength(firstName.value, 2) && checkLength(lastName.value, 2) && validateAddress(address.value) && validateZipCode(zipCode.value)) {
        shipmentFormMessage.style.display = "block";
        shipmentFormMessage.style.backgroundColor = "green";
        shipmentFormMessage.innerHTML = `<p>Shipment information successfully submited<p>`;
        paymentButton.style.backgroundColor = "#03dac6";
        paymentButton.disabled = false;
    }else {
        shipmentFormMessage.style.display = "block";
        shipmentFormMessage.style.backgroundColor = "red";
        shipmentFormMessage.innerHTML = `<p>Shipment information not valid<p>`;
        paymentButton.style.backgroundColor = "gray";
        paymentButton.disabled = true;

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


const paymentForm = document.querySelector(".payment-form");

const cardHolderName = document.querySelector("#payment-name");
const cardHolderNameError = document.querySelector("#payment-name-error");

const cardNumber = document.querySelector("#card-no");
const cardNumbererror = document.querySelector("#card-no-error");

const cardCvc = document.querySelector("#card-cvc");
const cardCvcError = document.querySelector("#card-cvc-error");

const expiryDate = document.querySelector("#date");
const expiryDateError = document.querySelector("#expiry-date-error");

const paymentFormMessage = document.querySelector("#payment-message");


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
        document.location = "/checkout-success.html";
    }else {
        paymentFormMessage.style.display = "block";
        paymentFormMessage.style.backgroundColor = "red";
        paymentFormMessage.innerHTML = `<p>Shipment information not valid<p>`;

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








