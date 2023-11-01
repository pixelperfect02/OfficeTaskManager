mysql> create database  TheBigProject;
-- Query OK, 1 row affected (0.00 sec)

mysql> use TheBigProject;
Database changed

mysql> create table USERS(
      User_ID int NOT NULL,
      Name varchar(200),
      DOB DATE,
      Gender varchar(100),
      Email varchar(300),
      Password varchar(200),
      PRIMARY KEY(User_ID)
);
-- Query OK, 0 rows affected (0.20 sec)

insert into USERS(User_ID,Name,DOB,Gender,Email,Password)
values(11,'CHRIS H','1998-8-27','M','chris@gmail.com','ch11');

-- Query OK, 1 row affected (0.00 sec)

select * from USERS;

-- +---------+---------+------------+--------+-----------------+----------+
-- | User_ID | Name    | DOB        | Gender | Email           | Password |
-- +---------+---------+------------+--------+-----------------+----------+
-- |      11 | CHRIS H | 1998-08-27 | M      | chris@gmail.com | ch11     |
-- +---------+---------+------------+--------+-----------------+----------+
-- 1 row in set (0.00 sec)

mysql>create table MANAGERS(
      Manager_ID int NOT NULL,
      Name varchar(200),
      DOB DATE,
      Gender varchar(100),
      Email varchar(300),
      Password varchar(200),
      PRIMARY KEY(Manager_ID)
);

-- Query OK, 0 rows affected (0.29 sec)

insert into MANAGERS(Manager_ID,Name,DOB,Gender,Email,Password)
values(22,'ARCHIE V','1999-10-02','F','archie@gmail.com','av22');

-- Query OK, 1 row affected (0.01 sec)

select * from MANAGERS;
-- +------------+----------+------------+--------+------------------+----------+
-- | Manager_ID | Name     | DOB        | Gender | Email            | Password |
-- +------------+----------+------------+--------+------------------+----------+
-- |         22 | ARCHIE V | 1999-10-02 | F      | archie@gmail.com | av22     |
-- +------------+----------+------------+--------+------------------+----------+
-- 1 row in set (0.00 sec)


mysql> create table SCHEDULES(
     Schedule_ID int NOT NULL,
     DUE_DATE DATE,
     PRIMARY KEY(Schedule_ID)
     );
-- Query OK, 0 rows affected (0.19 sec)

insert into SCHEDULES(Schedule_ID,DUE_DATE)
values(44,'2020-10-02');

-- Query OK, 1 row affected (0.01 sec)

select * from SCHEDULES;
-- +-------------+------------+
-- | Schedule_ID | DUE_DATE   |
-- +-------------+------------+
-- |          44 | 2020-10-02 |
-- +-------------+------------+
-- 1 row in set (0.00 sec)

mysql> create table TASKS(
     Task_ID int NOT NULL,
     Title varchar(200),
     State varchar(200),
     Schedule_ID int,
     PRIMARY KEY(Task_ID),
     FOREIGN KEY(Schedule_ID) REFERENCES
     SCHEDULES(Schedule_ID)

);
-- Query OK, 0 rows affected (0.27 sec)

insert into TASKS(Task_ID,Title,State,Schedule_ID)
values(33,'NOT STARTED','ARRANGE FILES',44);

-- Query OK, 1 row affected (0.01 sec)

select * from TASKS;

-- +---------+-------------+---------------+-------------+
-- | Task_ID | Title       | State         | Schedule_ID |
-- +---------+-------------+---------------+-------------+
-- |      33 | NOT STARTED | ARRANGE FILES |          44 |
-- +---------+-------------+---------------+-------------+
-- 1 row in set (0.00 sec)



mysql> create table IDS(
     User_ID int,
     Manager_ID int,
     Task_ID int
     );

-- Query OK, 0 rows affected (0.19 sec)

insert into IDS(User_ID,Manager_ID,Task_ID)
values(11,22,33);

-- Query OK, 1 row affected (0.01 sec)

select * from IDS;

-- +---------+------------+---------+
-- | User_ID | Manager_ID | Task_ID |
-- +---------+------------+---------+
-- |      11 |         22 |      33 |
-- +---------+------------+---------+
-- 1 row in set (0.00 sec)