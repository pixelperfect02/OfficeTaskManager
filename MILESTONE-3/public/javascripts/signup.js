var vueinst = new Vue({
    el: "#vuemain",
    data: {

        message: '',
        fname: '',
        lname: '',
        email: '',
        password: '',
        gender: '',
        dob: '',
        info: ''

    },
    methods: {

        isRegisteredUser: function(event) {
            this.message = this.fname + ' ' + this.lname + ' ' + this.email + ' ' + this.password + ' ' + this.dob + ' ' + this.gender;
            if (this.fname != '' && this.lname != '' && this.email != '' && this.password != '' && this.dob != '' && this.gender != '') {
                this.info = 'Registration is successful.';
            } else {
                this.info = 'Registration is unsuccessful.';
            }
        }


    }
});

function registration() {
    var name = document.getElementById("fname").value;
    var sname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var paass = document.getElementById("paass").value;
    var dob = document.getElementById("dob").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var role = document.querySelector('input[name="role"]:checked').value;
    var userid = '';
    console.log(name);
    console.log(sname);
    console.log(email);
    console.log(paass);
    console.log(gender);
    console.log(dob);
    console.log(role);
    if (name == '' || sname == '' || email == '' || paass == '' || dob == '' || role == '') {
        alert("Please fill up all the mandatory fields");
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText != 'unsuccess') {
                    var userdetails = JSON.parse(this.responseText);
                    userid = userdetails.userid;
                    console.log('New created User ID is: ' + userid);
                    sessionStorage.setItem("userid", userid);
                    sessionStorage.setItem("password", paass);
                    window.location.href = "../userinfo.html";

                }
            }
        };
        xhttp.open("POST", "/registration", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({

            name: name,
            lname: sname,
            email: email,
            paass: paass,
            dob: dob,
            gender: gender,
            role: role
        }));
    }
}