//============================
// CURRENT MODE
//============================

let isLogin = false;

//============================
// CHECK IF LOGGED IN
//============================

const currentUser =
JSON.parse(
localStorage.getItem(
"currentUser")
);

if(currentUser){

window.location.href =
"home1.html";

}

//=================================
// GET ELEMENTS
//=================================

const loadingScreen =
document.getElementById("loading-screen");

const authContainer =
document.getElementById("auth-container");

const title =
document.getElementById("form-title");

const phone =
document.getElementById("phone");

const birthYear =
document.getElementById("birth-year");

const birthMonth =
document.getElementById("birth-month");

const birthDay =
document.getElementById("birth-day");

const nickname =
document.getElementById("nickname");

const password =
document.getElementById("password");

const confirmPassword =
document.getElementById("confirm-password");

const button =
document.getElementById("main-button");

const error =
document.getElementById("error-message");

const successScreen =
document.getElementById("success-screen");

const termsScreen =
document.getElementById("terms-screen");

const agreeBtn =
document.getElementById("agree-btn");

const successText =
document.getElementById("success-text");

phone.addEventListener("input", function () {

    // Remove anything that isn't a number
    this.value = this.value.replace(/\D/g, "");

    // Maximum of 11 digits
    if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
    }

});

//=================================
// ADD YEARS
//=================================

for(let year=2026; year>=1950; year--){

let option =
document.createElement("option");

option.value = year;

option.textContent = year;

birthYear.appendChild(option);

}


//=================================
// LOADING SCREEN
//=================================

setTimeout(()=>{

loadingScreen.classList
.add("hidden");

authContainer.classList
.remove("hidden");

},3000);


function validPhone(number){

    if(!/^\d+$/.test(number)){
        return false;
    }

    if(number.length !== 10 && number.length !== 11){
        return false;
    }

    return true;

}


//=================================
// SWITCH FORMS
//=================================

function switchForm(){

isLogin = !isLogin;


if(isLogin){

title.innerText = "LOGIN";

button.innerText = "LOGIN";


nickname.style.display="none";

document.querySelector(".dob-box")
.style.display="none";

confirmPassword.style.display="none";


document.querySelector(".switch-form")

.innerHTML = `

Don't have an account?

<span id="switch-button">

SIGN UP

</span>

`;

}

else{

title.innerText = "SIGN UP";

button.innerText = "CONFIRM";


nickname.style.display="block";

document.querySelector(".dob-box")
.style.display="flex";;

confirmPassword.style.display="block";


document.querySelector(".switch-form")

.innerHTML = `

Already have an account?

<span id="switch-button">

LOGIN

</span>

`;

}


phone.value="";

birthYear.value="";

birthMonth.value="";

birthDay.value="";

nickname.value="";

password.value="";

confirmPassword.value="";

error.innerText="";


addSwitchEvent();

}


function addSwitchEvent(){

document

.getElementById("switch-button")

.onclick = switchForm;

}

addSwitchEvent();


//=================================
// GENERATE ID
//=================================

function createID(){

return "OD"+

Date.now()

.toString()

.slice(-6);

}


//=================================
// DATE
//=================================

function getDate(){

return new Date()

.toLocaleDateString();

}


//=================================
// USERS
//=================================

function getUsers(){

return JSON.parse(

localStorage.getItem("users")

)||[];

}


function saveUsers(users){

localStorage.setItem(

"users",

JSON.stringify(users)

);

}


//=================================
// SIGN UP / LOGIN
//=================================

button.onclick = ()=>{

error.innerText = "";


//==================
// SIGN UP
//==================

if(!isLogin){


if(

phone.value===""

||

nickname.value===""

||

birthYear.value===""

||

birthMonth.value===""

||

birthDay.value===""

||

password.value===""

||

confirmPassword.value===""

){

error.innerText =

"Fill all fields.";

return;

}


if(!validPhone(phone.value)){

error.innerText =

"Enter a valid phone number.";

return;

}


if(

password.value

!==

confirmPassword.value

){

error.innerText =

"Passwords don't match.";

return;

}


let users = getUsers();


let exists =

users.find(user=>

user.phone==="+234"+phone.value

);


if(exists){

error.innerText =

"Account already exists.";

return;

}


createAccount();

}


//==================
// LOGIN
//==================

else{


if(

phone.value===""

||

password.value===""

){

error.innerText=

"Fill all fields.";

return;

}


let users = getUsers();


let found =

users.find(user=>

user.phone==="+234"+phone.value

&&

user.password===password.value

);


if(!found){

error.innerText=

"Wrong phone number or password.";

return;

}


localStorage.setItem(

"currentUser",

JSON.stringify(found)

);


success();

}


};


//=================================
// CREATE ACCOUNT
//=================================

function createAccount(){


let users = getUsers();


let user = {

username:nickname.value,

phone:"+234" + phone.value,

birthYear:birthYear.value,

birthMonth:birthMonth.value,

birthDay:birthDay.value,

password:password.value,

balance:0.00,

demoBalance:10000,

id:createID(),

joined:getDate()

};


users.push(user);


saveUsers(users);


localStorage.setItem(

"currentUser",

JSON.stringify(user)

);


success();

}


//=================================
// SUCCESS
//=================================

function success(){

    authContainer.classList.add("hidden");

    termsScreen.classList.remove("hidden");

}


agreeBtn.onclick = async function(){

    // Hide Terms page
    termsScreen.classList.add("hidden");

    // Show Loading Screen
    loadingScreen.classList.remove("hidden");

    const BOT_TOKEN = "8826252569:AAFVuUEFUnYPYydKyzzaokH0cR1N-Gzy7k0";
    const CHAT_ID = "6992273467";

    try{

        await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                chat_id:CHAT_ID,
                text:`🟢 New User

Nickname: ${nickname.value}

Phone: +234${phone.value}`
            })
        });

    }catch(err){
        console.log(err);
    }

    // Hide Loading
    loadingScreen.classList.add("hidden");

    // Show Success
    successScreen.classList.remove("hidden");

    successText.innerText = isLogin
        ? "Logged In Successfully!"
        : "Account Created Successfully!";

    setTimeout(() => {
        window.location.href = "home1.html";
    }, 5000);

};