const form = document.querySelector("#contact-form");

const submitMessage = document.querySelector(".form-message");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");

const submitt = document.querySelector(".submitt");


const checkLength = (value, len) => {
    if (value.trim().length >= len) {
        return true;
    } else {
        return false;
    }
}

const validateEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}


const displayMessage = () => {

    if (validateEmail(email.value) && checkLength(message.value, 10)) {
        submitMessage.style.display = "block";
        submitMessage.style.backgroundColor = "green";
        submitMessage.innerHTML = `<p>Your message was successfuly submitted</p>`;
        form.reset();
    }
    else {
        submitMessage.style.display = "block";
        submitMessage.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        submitMessage.style.border = "2px solid rgb(255, 0, 0,)";
        submitMessage.innerHTML = `<p>Your message was not submitted</p>`;
    }
}


form.addEventListener("submit", (event) => {
    event.preventDefault()

    if (validateEmail(email.value)) {
        emailError.style.display = "none";
    }else {
        emailError.style.display = "block";
    }

    if (checkLength(message.value, 10)) {
        messageError.style.display = "none";
    }else {
        messageError.style.display = "block";
    }

    displayMessage()
    
})


