
//==========================
// CURRENT USER
//==========================

const currentUser =

JSON.parse(

localStorage.getItem(
"currentUser"
)

);


//==========================
// CHECK LOGIN
//==========================
if(!currentUser){

    window.location.href=
    "auth.html";

}
//==========================
// PROFILE IMAGE
//==========================

document.getElementById(

"profile-image"

).innerText =

currentUser.username[0]

.toUpperCase();




//==========================
// USERNAME
//==========================

document.getElementById(

"username"

).innerText =

currentUser.username;




//==========================
// TOTAL BALANCE
//==========================

document.getElementById(

"balance"

).innerText =

Number(

currentUser.balance

).toFixed(2);




//==========================
// DEPOSIT
//==========================

const depositButton =

document.querySelector(

".deposit-btn"

);


depositButton.onclick = ()=>{


    window.location.href=

    "deposit.html";


};




//==========================
// WITHDRAW
//==========================

const withdrawButton =

document.querySelector(

".withdraw-btn"

);


withdrawButton.onclick = ()=>{


    window.location.href=

    "withdraw.html";


};




//==========================
// CUSTOMER SERVICE
//==========================

const customerService =

document.querySelectorAll(

".option-item"

)[0];


customerService.onclick = ()=>{


    alert(

    "24/7 Customer Service Coming Soon."

    );


};




//==========================
// HOW TO PLAY
//==========================

const howToPlay =

document.querySelectorAll(

".option-item"

)[1];


howToPlay.onclick = ()=>{


    window.location.href=

    "settings.html";


};




//==========================
// LOG OUT
//==========================

const logoutButton =

document.querySelector(

".logout-btn"

);


logoutButton.onclick = ()=>{


    const confirmLogout =

    confirm(

    "Are you sure you want to log out?"

    );


    if(!confirmLogout){

        return;

    }


    localStorage.removeItem(

    "currentUser"

    );


    window.location.href=

    "auth.html";


};


//=====================
// NAVIGATION
//=====================

const navItems =

document.querySelectorAll(".nav-item");


navItems.forEach((item)=>{

    item.onclick = ()=>{

        window.location.href =

        item.dataset.page;

    };

});

//==========================
// PAGE LOADED
//==========================

window.onload = ()=>{


    console.log(

    "PROFILE PAGE LOADED"

    );


};