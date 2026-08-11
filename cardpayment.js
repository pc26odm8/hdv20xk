//=========================
// GET AMOUNT
//=========================

const params =

new URLSearchParams(

window.location.search

);


const amount =

params.get("amount") || "0";



document.getElementById(

"amount"

).innerText = amount;




//=========================
// PAGE SECTIONS
//=========================

const paymentPage =

document.getElementById(

"payment-page"

);


const errorPage =

document.getElementById(

"error-page"

);


const loadingOverlay =

document.getElementById(

"loading-overlay"

);


//=========================
// CARD NUMBER FORMAT
//=========================

const cardNumber =

document.getElementById(
"card-number"
);


const cardError =

document.getElementById(
"card-error"
);



cardNumber.addEventListener(

"input",

()=>{


let value =

cardNumber.value

.replace(/\D/g,'')

.substring(0,16);



value =

value.replace(

/(\d{4})(?=\d)/g,

"$1 "

);


cardNumber.value=

value;



const cleanNumber =

value.replace(/\s/g,'');




if(

cleanNumber.length===0

){

cardError.innerText="";

cardNumber.style.border=

"1px solid black";

}



else if(

cleanNumber.length<16

){

cardError.innerText=

"Card number must be 16 digits.";


cardNumber.style.border=

"2px solid red";


}



else if(

!isValidCard(cleanNumber)

){

cardError.innerText=

"Invalid card number.";


cardNumber.style.border=

"2px solid red";


}



else{


cardError.innerText="";


cardNumber.style.border=

"1px solid black";


}


});


//=========================
// EXPIRY DATE FORMAT
//=========================

const expiryDate =

document.getElementById(

"expiry-date"

);


expiryDate.addEventListener(

"input",

()=>{


let value =

expiryDate.value

.replace(/\D/g,'')

.substring(0,4);



if(

value.length>=3

){

value =

value.substring(0,2)

+

"/"

+

value.substring(2);


}


expiryDate.value=

value;


});


//=========================
// SHOW LOADING
//=========================

function showLoading(callback){


    loadingOverlay.classList
    .remove("hidden");


    setTimeout(()=>{


        loadingOverlay.classList
        .add("hidden");


        callback();


    },5000);


}




//=========================
// LUHN CHECK
//=========================

function isValidCard(number){


    number =

    number.replace(/\s/g,'');



    let sum = 0;

    let shouldDouble = false;



    for(

    let i = number.length-1;

    i>=0;

    i--

    ){


        let digit =

        parseInt(number.charAt(i));


        if(shouldDouble){


            digit*=2;


            if(digit>9){

                digit-=9;

            }

        }


        sum+=digit;


        shouldDouble =

        !shouldDouble;


    }


    return(

    sum % 10 === 0

    );


}




//=========================
// EXPIRY DATE CHECK
//=========================

function isValidDate(value){


    const format =

    /^(0[1-9]|1[0-2])\/([0-9]{2})$/;


    if(

    !format.test(value)

    ){

        return false;

    }


    const month =

    parseInt(

    value.substring(0,2)

    );


    const year =

    parseInt(

    value.substring(3)

    );


    const currentDate =

    new Date();


    const currentMonth =

    currentDate.getMonth()+1;


    const currentYear =

    currentDate.getFullYear()%100;



    if(

    year<currentYear

    ){

        return false;

    }



    if(

    year===currentYear

    &&

    month<currentMonth

    ){

        return false;

    }


    return true;


}




//=========================
// CARD HOLDER NAME
//=========================

function isValidName(name){


    return(

    /^[A-Za-z ]+$/

    .test(name)

    );


}




//=========================
// PAY BUTTON
//=========================

document.getElementById(

"pay-btn"

).onclick = ()=>{


//---------------------
// GET VALUES
//---------------------


const cardNumber =

document.getElementById(

"card-number"

);


const expiryDate =

document.getElementById(

"expiry-date"

);


const cvv =

document.getElementById(

"cvv"

);


const cardName =

document.getElementById(

"card-name"

);



const cardError =

document.getElementById(

"card-error"

);


const dateError =

document.getElementById(

"date-error"

);


const cvvError =

document.getElementById(

"cvv-error"

);


const nameError =

document.getElementById(

"name-error"

);



//---------------------
// RESET ERRORS
//---------------------


cardError.innerText="";

dateError.innerText="";
cvvError.innerText="";
nameError.innerText="";


cardNumber.style.border=
"1px solid black";

expiryDate.style.border=
"1px solid black";

cvv.style.border=
"1px solid black";

cardName.style.border=
"1px solid black";


let valid = true;




//---------------------
// CARD NUMBER
//---------------------


const cleanNumber =

cardNumber.value
.replace(/\s/g,'');


if(

!/^[0-9]+$/
.test(cleanNumber)

||

cleanNumber.length!==16

||

!isValidCard(
cleanNumber
)

){

    valid=false;


    cardError.innerText=

    "Invalid card number.";


    cardNumber.style.border=

    "2px solid red";


}




//---------------------
// EXPIRY DATE
//---------------------


if(

!isValidDate(

expiryDate.value

)

){

    valid=false;


    dateError.innerText=

    "Invalid expiry date.";


    expiryDate.style.border=

    "2px solid red";


}




//---------------------
// CVV
//---------------------


if(

!/^[0-9]{3}$/
.test(cvv.value)

){

    valid=false;


    cvvError.innerText=

    "Invalid CVV.";


    cvv.style.border=

    "2px solid red";


}




//---------------------
// CARD HOLDER NAME
//---------------------


if(

!isValidName(

cardName.value.trim()

)

||

cardName.value.trim()===""

){

    valid=false;


    nameError.innerText=

    "Invalid card holder name.";


    cardName.style.border=

    "2px solid red";


}




//---------------------
// STOP HERE
//---------------------


if(!valid){

    return;

}




//---------------------
// SHOW LOADING
//---------------------


showLoading(()=>{


    paymentPage.classList
    .add("hidden");


    errorPage.classList
    .remove("hidden");


});


};




//=========================
// BACK BUTTON
//=========================

document.getElementById(

"back-btn"

).onclick = ()=>{


    window.location.href=

    "deposit.html";


};




//=========================
// ERROR PAGE BACK
//=========================

document.getElementById(

"error-back"

).onclick = ()=>{


    errorPage.classList
    .add("hidden");


    paymentPage.classList
    .remove("hidden");


};




//=========================
// PAGE LOADED
//=========================

console.log(

"CARD PAYMENT PAGE LOADED"

);