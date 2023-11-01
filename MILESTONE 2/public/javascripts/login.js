// var sarr=[
// { name:'Adelaide City',  address:'45 Florabunda Lane, Adelaide, 5000', counter: 0, img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/11_Gloddaeth_Street%2C_Llandudno_shop_front.jpg/320px-11_Gloddaeth_Street%2C_Llandudno_shop_front.jpg' },
// { name:'Steelton South', address:'77 Weigall Avenue, Steelton, 5413',  counter: 0, img:'https://upload.wikimedia.org/wikipedia/commons/4/42/Well-shop-front.jpg' },
// { name:'Milton',         address:'33 McGregor Street, Milton, 5880',   counter: 0, img:'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Greggs_store_front.JPG/320px-Greggs_store_front.JPG' }];
function createanAccount() {
    window.location.href = "../signup.html";
}

var cred=
{ username:'archie', pwd:'apple' };
var vueinst = new Vue({
el: "#vuemain",
data: {
message:'',
},
methods: {
}
});
function isLogin() {
var uname = document.getElementById("uname").value;
var pas = document.getElementById("pas").value;
console.log(uname);
console.log(pas);
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
// document.getElementById("output").innerText = this.responseText;
vueinst.message=this.responseText;
}
};
xhttp.open("POST", "/login", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send(JSON.stringify({ uname: uname, pas: pas }));
}