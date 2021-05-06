window.addEventListener('load', function() {
    fetchuserrole();
});

function fetchuserrole() {
    var uname = sessionStorage.getItem("username");
    console.log(uname);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var userRole = JSON.parse(this.responseText);
            sessionStorage.setItem("role", userRole.role);
            //alert(userRole.role);
            if ('USER' == userRole.role) {
                document.getElementById('assigntask').disabled = true;
                document.getElementById('taskview').disabled = false;



            } else if ('MANAGER' == userRole.role) {
                document.getElementById('assigntask').disabled = false;
                document.getElementById('taskview').disabled = true;

            }
        }
    };
    xhttp.open("POST", "/fetchuserrole", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        uname: uname
    }));

}

function assignTasks() {
    //location.replace("https://51cccca0-438d-4599-8190-0c6b69ebe0a4-ide.cs50.xyz/assigntasks.html");
    window.location.href = "../assigntasks.html";
}

function editprofile() {
    //location.replace("https://51cccca0-438d-4599-8190-0c6b69ebe0a4-ide.cs50.xyz/assigntasks.html");
    window.location.href = "../editprofile.html";
}

function managetyotask() {
    //location.replace("https://51cccca0-438d-4599-8190-0c6b69ebe0a4-ide.cs50.xyz/assigntasks.html");
    window.location.href = "../managetyotask.html";
}

function emailnotification() {
    //location.replace("https://51cccca0-438d-4599-8190-0c6b69ebe0a4-ide.cs50.xyz/assigntasks.html");
    window.location.href = "../emailnotification.html";
}

function manageavailability() {
    //location.replace("https://51cccca0-438d-4599-8190-0c6b69ebe0a4-ide.cs50.xyz/assigntasks.html");
    window.location.href = "../manageavailability.html";
}

function message() {
    //location.replace("https://51cccca0-438d-4599-8190-0c6b69ebe0a4-ide.cs50.xyz/assigntasks.html");
    window.location.href = "../message.html";
}
//LOGOUT
function logOut() {
    var uname = sessionStorage.getItem("username");
    console.log(uname);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if ('success' == this.responseText) {
                window.location.href = "../login.html";
            }
        }
    };
    xhttp.open("POST", "/logout", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        uname: uname
    }));
}

function displaytasks() {
    window.location.href = "../viewschedule.html";
}

function currentTime() {
    var date = new Date(); /* creating object of Date class */
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var midday = "AM";
    midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
    hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12) : hour); /* assigning hour in 12-hour format */
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("clock").innerText = hour + " : " + min + " : " + sec + " " + midday; /* adding time to the div */
    var t = setTimeout(currentTime, 1000); /* setting timer */
}

function updateTime(k) {
    /* appending 0 before time elements if less than 10 */
    if (k < 10) {
        return "0" + k;
    } else {
        return k;
    }
}

currentTime();


(function() {
    'use strict';
    var tasker = {
        init: function() {
            this.cacheDom();
            this.bindEvents();
            this.evalTasklist();
        },
        cacheDom: function() {
            this.taskInput = document.getElementById("input-task");
            this.addBtn = document.getElementById("add-task");
            this.tasklist = document.getElementById("tasks");
            this.tasklistChildren = this.tasklist.children;
            this.errorMessage = document.getElementById("error");
        },
        bindEvents: function() {
            this.addBtn.onclick = this.addTask.bind(this);
            this.taskInput.onkeypress = this.enterKey.bind(this);
        },
        evalTasklist: function() {
            var i, chkBox, delBtn;
            for (i = 0; i < this.tasklistChildren.length; i += 1) {

                chkBox = this.tasklistChildren[i].getElementsByTagName("input")[0];
                chkBox.onclick = this.completeTask.bind(this, this.tasklistChildren[i], chkBox);

                delBtn = this.tasklistChildren[i].getElementsByTagName("button")[0];
                delBtn.onclick = this.delTask.bind(this, i);
            }
        },
        render: function() {
            var taskLi, taskChkbx, taskVal, taskBtn, taskTrsh;
            taskLi = document.createElement("li");
            taskLi.setAttribute("class", "task");
            taskChkbx = document.createElement("input");
            taskChkbx.setAttribute("type", "checkbox");
            taskVal = document.createTextNode(this.taskInput.value);
            taskBtn = document.createElement("button");
            taskTrsh = document.createElement("i");
            taskTrsh.setAttribute("class", "fa fa-trash");
            taskBtn.appendChild(taskTrsh);

            taskLi.appendChild(taskChkbx);
            taskLi.appendChild(taskVal);
            taskLi.appendChild(taskBtn);

            this.tasklist.appendChild(taskLi);

        },
        completeTask: function(i, chkBox) {
            if (chkBox.checked) {
                i.className = "task completed";
            } else {
                this.incompleteTask(i);
            }
        },
        incompleteTask: function(i) {
            i.className = "task";
        },
        enterKey: function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                this.addTask();
            }
        },
        addTask: function() {
            var value = this.taskInput.value;
            this.errorMessage.style.display = "none";

            if (value === "") {
                this.error();
            } else {
                this.render();
                this.taskInput.value = "";
                this.evalTasklist();
            }
        },
        delTask: function(i) {
            this.tasklist.children[i].remove();
            this.evalTasklist();
        },
        error: function() {
            this.errorMessage.style.display = "block";
        }
    };

    tasker.init();

}());

function hourglass() {
    var a;
    a = document.getElementById("div1");
    a.innerHTML = "&#xf251;";
    setTimeout(function() {
        a.innerHTML = "&#xf252;";
    }, 1000);
    setTimeout(function() {
        a.innerHTML = "&#xf253;";
    }, 2000);
}
hourglass();
setInterval(hourglass, 3000);