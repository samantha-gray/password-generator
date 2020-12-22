// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

function getRandomUpperCase(){
	return String.fromCharCode(Math.floor(Math.random()*26)+65);
}
function getRandomLowerCase(){
	return String.fromCharCode(Math.floor(Math.random()*26)+97);
}
 function getRandomNumber(){
	return String.fromCharCode(Math.floor(Math.random()*10)+48);
}
 function getRandomSymbol(){
    var symbol = "!@#$%^&*(){}[]=<>/,.|~?";
    return symbol[Math.floor(Math.random()*symbol.length)];
}

const randomFunc = {
    upper : getRandomUpperCase,
    lower : getRandomLowerCase,
    number : getRandomNumber,
    symbol : getRandomSymbol
};

function handlePrompts() {
    let length = prompt("How long do you want your password to be? Please choose a number between 8 and 128")
    let isValidNumber = /^\d*$/.test(length)
    if(!isValidNumber) {
		return alert("Please input a valid number.")
    }
    if(length < 8 || length > 128) {
        return alert("Please choose a valid length.")
    } 

    let hasUpper = confirm("Would you like your password to contain uppercase letters?")
    let hasLower = confirm("Would you like your password to contain lowercase letters?")
    let hasNumber = confirm("Would like your password to contain numbers?")
    let hasSymbols = confirm("Would you like your password to contain symbols?")
    
    console.log("length", length, "hasUpper?", hasUpper, "hasLower?", hasLower, "hasNumber?", hasNumber, "hasSymbols?", hasSymbols);
 
    passwordText.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbols, length);
}

function generatePassword(upper, lower, number, symbol, length){
    let generatedPassword = "";

    const typesCount = upper + lower + number + symbol;

    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if(typesCount === 0) {
        return '';
    }

    for(let i=0; i<length; i+=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);


    return finalPassword;
}
generateBtn.addEventListener("click", handlePrompts);