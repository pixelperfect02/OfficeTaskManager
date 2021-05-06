window.addEventListener('load', function() {
    fetchusermessage();
});

function sendMsg() {
    var userid = sessionStorage.getItem("username");
    var msg = userid + ':' + document.getElementById("usermsg").value;
    console.log(msg);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            if (this.responseText != 'unsuccess') {
                console.log('I am in send message ' + this.responseText);
                var userMsg = JSON.parse(this.responseText),
                    msgText = '';
                console.log(userMsg);
                for (var index = 0; index < userMsg.msg.length; index++) {
                    msgText += '<span>' + userMsg.msg[index].messagetext + '</span><br />';
                }
                document.getElementById('chatbox').innerHTML = msgText;
            }
        }
    };
    xhttp.open("POST", "/savemsg", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        msg: msg
    }));
}

function fetchusermessage() {
    var userid = sessionStorage.getItem("username");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            if (this.responseText != 'unsuccess') {
                console.log('I am in send message ' + this.responseText);
                var userMsg = JSON.parse(this.responseText),
                    msgText = '';
                console.log(userMsg);
                for (var index = 0; index < userMsg.msg.length; index++) {
                    msgText += '<span>' + userMsg.msg[index].messagetext + '</span><br />';
                }
                document.getElementById('chatbox').innerHTML = msgText;
            }
        }

    };
    xhttp.open("POST", "/fetchmsg", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        msg: msg
    }));
}