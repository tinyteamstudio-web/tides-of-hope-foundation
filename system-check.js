const WEBAPP_URL =
"https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

document.addEventListener(
"DOMContentLoaded",
function(){

checkAppsScript();
checkUser();
checkVolunteer();
checkBrowser();
checkSession();

}
);

async function checkAppsScript(){

try{

const response =
await fetch(
WEBAPP_URL +
"?action=pingTest2026"
);

const result =
await response.json();

document.getElementById(
"appsScriptStatus"
).textContent =
result.success
? "✅ Connected"
: "❌ Not Connected";

}catch(error){

document.getElementById(
"appsScriptStatus"
).textContent =
"❌ Connection Failed";

}

}

function checkUser(){

const email =
sessionStorage.getItem(
"tohUserEmail"
);

document.getElementById(
"loggedUserStatus"
).textContent =
email || "No Active User";

}

function checkVolunteer(){

const volunteer =
sessionStorage.getItem(
"tohVolunteerName"
);

document.getElementById(
"volunteerStatus"
).textContent =
volunteer || "No Volunteer Session";

}

function checkBrowser(){

document.getElementById(
"browserStatus"
).textContent =
navigator.userAgent;

document.getElementById(
"urlStatus"
).textContent =
window.location.href;

}

function checkSession(){

document.getElementById(
"sessionStatus"
).textContent =
sessionStorage.length +
" Active Session Items";

}