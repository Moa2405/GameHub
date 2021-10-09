const signUpForm = document.querySelector(".create-acount-form")
const email = document.querySelector("#email")
const emailError = document.querySelector("#email-error")
const password = document.querySelector("#password")
const passwordError = document.querySelector("#password-error")
const signUpFormMessageHtml = document.querySelector(".form-message")
console.log(signUpFormMessageHtml)



const validateEmail = (email) => {
    const regEx =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

const validatePassword = (password) => {
    const regEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    const patternMatches = regEx.test(password);
    return patternMatches;
}


const signUpFormMessage = () => {
    if (validateEmail(email.valeu) && validatePassword(password.valeu)) {
        signUpFormMessageHtml.style.display = "block"
       signUpFormMessageHtml.innerHTML = `<p>You have succssesfoly signd up for a GameHub Acount</p>` 
    }else {
        signUpFormMessageHtml.style.display = "block"
        signUpFormMessageHtml.style.backgroundColor = "red"
        signUpFormMessageHtml.innerHTML = `<p>Email or password are not valid</p>`

    }

}

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (validateEmail(email.valeu)) {
        emailError.style.display = "none"
    }else {
        emailError.style.display = "block"
    }

    if (validatePassword(password.valeu)) {
        passwordError.style.display = "none"
    }else {
        passwordError.style.display = "block"
    }

    signUpFormMessage()
})
