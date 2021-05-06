function createanAccount() {
    window.location.href = "../signup.html";
}

var cred = {
    username: 'archie',
    pwd: 'apple'
};
var vueinst = new Vue({
    el: "#vuemain",
    data: {
        message: '',
    },
    methods: {}
});

function isLogin() {
    var uname = document.getElementById("uname").value;
    var pas = document.getElementById("pas").value;
    console.log(uname);
    console.log(pas);
    if (uname == '' || pas == '') {
        alert("Please fill up all the mandatory fields");
    } else {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                vueinst.message = this.responseText;
                sessionStorage.setItem("username", uname);
                window.location.href = "../profilepage.html";
            }
        };
        xhttp.open("POST", "/login", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({
            uname: uname,
            pas: pas
        }));

    }
}