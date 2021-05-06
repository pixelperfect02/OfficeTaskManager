function editprofile() {
    var name = document.getElementById("name").value;
    var dob = document.getElementById("dob").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var userid = sessionStorage.getItem("username");
    console.log(name);
    console.log(dob);
    console.log(email);
    console.log(password);
    if (name == '' || dob == '' || email == '' || password == '') {
        alert("Please fill up all the mandatory fields");
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == 'success') {
                    alert('UPDATE SUCCESSFUL');
                    window.location.href = "../profilepage.html";
                }
            }
        };
        xhttp.open("POST", "/editprofile", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({
            name: name,
            dob: dob,
            email: email,
            password: password,
            userid: userid
        }));

    }
}