create database  TheBigProject;

use TheBigProject;

-- //USERS TABLE IS FOR BOTH USERS AND MANAGERS
create table USERS(
      User_ID int NOT NULL AUTO_INCREMENT,
      Name varchar(200),
      DOB varchar(200),
      Gender varchar(100),
      Email varchar(300),
      Password varchar(200),
      role varchar(200),
      session varchar(100),
      PRIMARY KEY(User_ID)
);

-- //SCHEDULES TABLE IS FOR MANAGE AVAILABILITY BUTTON WHERE
-- //SCHEDULE ID IS SAME AS THE USER ID WHICH THE USER HAS TO ENTER
create table SCHEDULES(
     Schedule_ID int,
     DUE_DATE_TIME varchar(200)
     );

-- //TASKS TABLE IS FOR MANAGE TASKS BUTTON WHERE
-- //TASK ID IS SAME AS THE USER ID WHICH THE USER HAS TO ENTER
create table TASKS(
     Task_ID int ,
     Title varchar(200)

);

-- //MESSAGE TABLE IS FOR MESSAGE BUTTON WHERE
-- //MESSAGE ID IS SAME AS THE USER ID
create table message(
message_id int AUTO_INCREMENT,
message_text varchar(200),
PRIMARY KEY(message_id)
);

