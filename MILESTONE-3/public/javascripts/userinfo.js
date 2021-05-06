window.addEventListener('load', function() {
    displayuserinfo();
});

function displayuserinfo() {
    var username = sessionStorage.getItem("userid");
    var password = sessionStorage.getItem("password");
    document.getElementById("userid").innerHTML = username;
    document.getElementById("password").innerHTML = password;
}

function gotologin() {
    window.location.href = "../login.html";
}