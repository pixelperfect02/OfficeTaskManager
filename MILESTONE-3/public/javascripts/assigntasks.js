window.addEventListener('load', function() {
    fetchusers();
});

function assignTaskk() {
    var billamt = document.getElementById("billamt").value;
    var serviceQual = document.getElementById("serviceQual").value;
    console.log(billamt);
    console.log(serviceQual);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            alert('TASK HAS BEEN ASSIGNED');
            window.location.href = "../profilepage.html";


        }
    };
    xhttp.open("POST", "/assignTaskk", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        billamt: billamt,
        serviceQual: serviceQual
    }));
}


function fetchusers() {
    var uname = sessionStorage.getItem("username");
    console.log(uname);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var username = JSON.parse(this.responseText),
                usernames = '';
            console.log(username);
            usernames += '<option disabled selected value="0">CHOOSE USER</option>';
            for (var index = 0; index < username.name.length; index++) {

                usernames += '<option value="' + username.name[index].userid + '">' + username.name[index].names + '</option>';
            }
            document.getElementById('serviceQual').innerHTML = usernames;
        }
    };
    xhttp.open("POST", "/fetchusers", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        uname: uname
    }));
}
//Calculate Tip
function calculateTip() {
    var billAmt = document.getElementById("billamt").value;
    var serviceQual = document.getElementById("serviceQual").value;
    var numOfPeople = document.getElementById("peopleamt").value;

    //validate input
    if (billAmt === "" || serviceQual == 0) {
        alert("Please enter values");
        return;
    }
    //Check to see if this input is empty or less than or equal to 1
    if (numOfPeople === "" || numOfPeople <= 1) {
        numOfPeople = 1;
        document.getElementById("each").style.display = "none";
    } else {
        document.getElementById("each").style.display = "block";
    }

    //Calculate tip
    var total = (billAmt * serviceQual) / numOfPeople;
    //round to two decimal places
    total = Math.round(total * 100) / 100;
    //next line allows us to always have two digits after decimal point
    total = total.toFixed(2);
    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total;

}

