function assignTasks() {
  //location.replace("https://51cccca0-438d-4599-8190-0c6b69ebe0a4-ide.cs50.xyz/assigntasks.html");
  window.location.href = "../assigntasks.html";
}

function displaytasks(){
var notification=document.getElementById("scheduledtasks");
var assignee=sessionStorage.getItem("assignee");
notification.innerHTML="<span>task assigned to "+assignee+"</span><br />";

}

function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var midday = "AM";
  midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
  hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour); /* assigning hour in 12-hour format */
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  document.getElementById("clock").innerText = hour + " : " + min + " : " + sec + " " + midday; /* adding time to the div */
    var t = setTimeout(currentTime, 1000); /* setting timer */
}

function updateTime(k) { /* appending 0 before time elements if less than 10 */
  if (k < 10) {
    return "0" + k;
  }
  else {
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