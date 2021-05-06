// "use strict";
const express = require("express");
var xss = require("xss");
var html = xss('<script>alert("xss");</script>');
console.log(html);
let app = express();
const session = require("express-session");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
// App settings
app.set("view engine", "pug");

// App middleware
app.use("/static", express.static("static"));
// // app.use(session({
// //   cookie: { httpOnly: true },
// //   secret: "long random string"
// // }));

// let oidc = new ExpressOIDC({
//   issuer: "https://{yourOktaDomain}/oauth2/default",
//   client_id: "{clientId}",
//   client_secret: "{clientSecret}",
//   redirect_uri: "http://localhost:3000/authorization-code/callback",
//   routes: {
//     callback: { defaultRedirect: "/dashboard" }
//   },
//   scope: 'openid profile'
// });

var router = express.Router();
var sql = require('../public/sql/mysql.js');

var nodemailer = require('nodemailer');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
var text = '';


//LOGIN FOR OUR WEB APPLICATION


router.post('/login', function(req, res, next) {
    var username = req.body.uname;
    var password = req.body.pas;
    console.log(username);
    console.log(password);

    //SQL INJECTION
    var sqlQuery = 'SELECT Password FROM USERS WHERE User_ID=?';
    sql.query(sqlQuery, [username], function(err, response) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            // result(null, res);
            console.log('I AM IN THE DATABASE' + response);
            console.log('the cred from db' + response[0].Password);
            console.log('the cred from page ' + password);
            if (response[0].Password === password) {
                var sqlquery = "update USERS set session ='ACTIVE' WHERE User_ID ='" + username + "'";
                text = 'login successful: ' + username + ' ' + password;
                sql.query(sqlquery, function(error, updateresponse) {
                    if (error) {
                        console.log("error: ", error);

                    } else {
                        console.log(updateresponse.affectedrows + 'records updated');

                    }
                });
            } else {
                text = 'login unsuccessful: ' + username + ' ' + password;
            }
            res.send(text);
        }

    });

});


//LOGOUT
router.post('/logout', function(req, res, next) {
    var username = req.body.uname;
    console.log(username);
    sql.query("UPDATE USERS SET session ='INACTIVE' where User_ID='" + username + "'", function(err, response) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if (response.affectedRows == 1) {
                text = 'success';
            } else {
                text = 'unsuccess';
            }
            res.send(text);
        }

    });
});


// EDIT PROFILE
router.post('/editprofile', function(req, res, next) {

    //Get username and password from POST request

    var name = req.body.name;
    var dob = req.body.dob;
    var email = req.body.email;
    var password = req.body.password;
    var userid = req.body.userid;

    console.log(name);
    console.log(dob);
    console.log(email);
    console.log(password);
    console.log(userid);

    sql.query("update USERS set Name='" + name + "', DOB='" + dob + "', Email='" + email + "', Password='" + password + "' where User_ID='" + userid + "'", function(err, response) {
        if (err) {
            console.log("error: ", err);
        } else {
            if (response.affectedRows == 1) {
                text = 'success';
            } else {
                text = 'unsuccess';
            }
            res.send(text);
        }

    });

});




// REGISTRATION
router.post('/registration', function(req, res, next) {

    //Get username and password from POST request

    var name = req.body.name;
    var sname = req.body.lname;
    var email = req.body.email;
    var paass = req.body.paass;
    var gender = req.body.gender;
    var dob = req.body.dob;
    var role = req.body.role;
    var session = null;

    console.log(name);
    console.log(sname);
    console.log(email);
    console.log(paass);
    console.log(gender);
    console.log(dob);
    console.log(role);


    //Connect to the database
    // Query to get user info
    var insertquery = "INSERT INTO USERS (Name,DOB,Gender,Email,Password,role,session) VALUES ('" + name + "','" + dob + "','" + gender + "','" + email + "','" + paass + "','" + role + "','" + session + "')";
    sql.query(insertquery, function(err, response) {
        if (err) {
            console.log("error: ", err);
            text = "unsuccess";
        } else {
            console.log(response.affectedrows + 'records inserted');
            var sqlquery = "SELECT * FROM USERS WHERE Email='" + email + "'";
            sql.query(sqlquery, function(error, updateresponse) {
                if (error) {
                    console.log("error: ", error);

                } else {
                    //  text=updateresponse[0].User_ID;
                    console.log('New created user with User ID ' + text);
                    res.status(200).json({
                        userid: updateresponse[0].User_ID
                    });
                }
            });


        }

    });
});




// // MANAGE AVAILABILITY
router.post('/manageavailability', function(req, res, next) {

    // Get username and password from POST request

    var picker = req.body.picker;
    var uid = req.body.uid;
    console.log("I am in manage availability" + picker);
    console.log(uid);

    //Connect to the database
    // Query to get user info
    var query = "INSERT INTO SCHEDULES (Schedule_ID,DUE_DATE_TIME) VALUES ('" + uid + "','" + picker + "')";
    sql.query(query, function(err, response) {
        if (err) {
            console.log("error: ", err);
            text = "unsuccess";
        } else {
            console.log(response.affectedrows + 'records inserted');
            text = "success";
        }
        res.send(text);
    });
});




// // // MANAGE THE TYPE OF TASK
router.post('/managetyoftask', function(req, res, next) {

    //Get username and password from POST request

    var serviceQual = req.body.serviceQual;
    var uid = req.body.uid;
    console.log(serviceQual);
    console.log(uid);


    //Connect to the database
    // Query to get user info
    var query = "INSERT INTO TASKS(Title,Task_ID) VALUES ('" + serviceQual + "','" + uid + "')";
    sql.query(query, function(err, response) {
        if (err) {
            console.log("error: ", err);
            text = "unsuccess";
        } else {
            console.log(response.affectedrows + 'records inserted');
            text = "success";
        }
        res.send(text);
    });
});



//SAVE MESSAGE
router.post('/savemsg', function(req, res, next) {
    var msg = req.body.msg;
    console.log(msg);
    //Connect to the database
    // Query to save user msg
    insertquery = "INSERT INTO message(message_text) VALUES ('" + msg + "')";
    sql.query(insertquery, function(err, response) {
        if (err) {
            console.log("error: ", err);
            text = "unsuccess";
            res.send(text);
        } else {
            console.log(response.affectedrows + 'records inserted');

            var sqlquery = "SELECT message_text FROM message";
            sql.query(sqlquery, function(error, updateresponse) {
                if (error) {
                    console.log("error: ", error);
                    res.send('');
                } else {
                    console.log(updateresponse);
                    var msgobj = {},
                        msgobjarr = [];
                    for (var index = 0; index < updateresponse.length; index++) {
                        msgobj['messagetext'] = updateresponse[index].message_text;
                        console.log('value of message : ' + updateresponse[index].message_text);
                        msgobjarr.push(msgobj);
                        msgobj = {};
                        console.log('I AM DONE WITH MESSAGE: ' + msgobjarr);
                    }
                    res.status(200).json({
                        msg: msgobjarr
                    });


                }
            });




        }

    });

});


//FETCH  MESSAGE
router.post('/fetchmessage', function(req, res, next) {
    var sqlquery = "SELECT message_text FROM message";
    sql.query(sqlquery, function(error, updateresponse) {
        if (error) {
            console.log("error: ", error);
            res.send('');
        } else {
            console.log(updateresponse);
            var msgobj = {},
                msgobjarr = [];
            for (var index = 0; index < updateresponse.length; index++) {
                msgobj['messagetext'] = updateresponse[index].message_text;
                console.log('value of message : ' + updateresponse[index].message_text);
                msgobjarr.push(msgobj);
                msgobj = {};
            }
            res.status(200).json({
                msg: msgobjarr
            });

        }
    });

});
//FETCH  ROLE
router.post('/fetchuserrole', function(req, res, next) {
    var username = req.body.uname;
    console.log(username);


    sql.query("SELECT role FROM USERS WHERE User_ID='" + username + "'", function(err, response) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            // result(null, res);
            console.log('I AM IN THE DATABASE' + response);
            console.log('my role from db' + response[0].role);
            res.status(200).json({
                role: response[0].role
            });
        }

    });

});

//EMAIL ID NOTIFICATION


var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'archieverma@gmail.com',
        pass: 'maapaa114'
    }
});

var mailOptions = {
    from: 'archieverma114@gmail.com',
    to: 'siddharthar19@gmail.com',
    subject: 'TASK ASSIGNED!!!',
    text: 'ONE TASK HAS BEEN ASSIGNED, PLEASE COMPLETE BY YOUR DUE DATE.'
};

//EMAIL NOTIFICATION
router.post('/emailnotification', function(req, res, next) {
    var username = req.body.uname;
    console.log(username);


    sql.query("SELECT Email FROM USERS WHERE User_ID='" + username + "'", function(err, response) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            // result(null, res);
            console.log('I AM IN THE DATABASE' + response);
            console.log('the email from db' + response[0].Email);
            mailOptions.to = response[0].Email;
            console.log(mailOptions);
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('It is an error to send a mail' + error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.send(text);
        }

    });

});

//FETCH USERS
router.post('/fetchusers', function(req, res, next) {
    var username = req.body.uname;
    console.log(username);
    sql.query("SELECT Name,User_ID FROM USERS WHERE role='USER'", function(err, response) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log('I AM IN THE DATABASE' + response);
            var userobj = {},
                userobjarr = [];
            for (var index = 0; index < response.length; index++) {
                userobj['names'] = response[index].Name;
                userobj['userid'] = response[index].User_ID;
                console.log('value of Users : ' + response[index].Name);
                console.log('value of User_ID : ' + response[index].User_ID);
                userobjarr.push(userobj);
                userobj = {};
            }
            res.status(200).json({
                name: userobjarr
            });
        }
    });

});

// ASSIGN TASKS
router.post('/assignTaskk', function(req, res, next) {

    //Get username and password from POST request

    var billamt = req.body.billamt;
    var serviceQual = req.body.serviceQual;
    console.log(billamt);
    console.log(serviceQual);
    //Connect to the database
    // Query to get user info
    var insertquery = "INSERT INTO TASKS (Task_ID,Title) VALUES ('" + serviceQual + "','" + billamt + "')";
    sql.query(insertquery, function(err, response) {

        if (err) {
            console.log("error: ", err);
        } else {
            if (response.affectedRows == 1) {
                text = 'success';
            } else {
                text = 'unsuccess';
            }
            res.send(text);
        }


    });
});



// VIEW SCHEDULED TASKS
router.post('/alltasks', function(req, res, next) {
    var userid = req.body.username;
    console.log('user id to fetch' + userid);
    var sqlquery = "SELECT TASKS.Title,USERS.Name FROM TASKS,USERS where Task_ID=User_ID and Task_ID=?";
    sql.query(sqlquery, [userid], function(error, response) {
        if (error) {
            console.log("error: ", error);
            res.send('');
        } else {
            console.log(response);
            var taskobj = {},
                taskobjarr = [];
            for (var index = 0; index < response.length; index++) {
                taskobj['title'] = response[index].Title;
                taskobj['name'] = response[index].Name;
                console.log('value of Task title : ' + response[index].Title);
                console.log('value of Name: ' + response[index].Name);
                taskobjarr.push(taskobj);
                taskobj = {};
            }
            res.status(200).json({
                task: taskobjarr
            });

        }
    });

});

module.exports = router;