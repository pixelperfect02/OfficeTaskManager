window.addEventListener('load', function() {
    allTasks();
});


function allTasks() {
    var username = sessionStorage.getItem("username");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {


            if (this.responseText != 'unsuccess') {

                console.log('I am in send message ' + this.responseText);
                var taskTitle = JSON.parse(this.responseText),
                    taskText = '';
                console.log(taskTitle);
                for (var index = 0; index < taskTitle.task.length; index++) {
                    taskText += '<span>The task ' + taskTitle.task[index].title + ' has been assigned to ' + taskTitle.task[index].name + '</span><br />';

                }
                document.getElementById('calculator').innerHTML = taskText;

            }

        }

    };
    xhttp.open("POST", "/allTasks", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        username: username
    }));
}