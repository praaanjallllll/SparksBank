create database sparks_bank;
create database sparks_bank;
use sparks_bank;
create table account(Id int auto_increment primary key,Acc_no int(100), User_name varchar(150) not null, 
User_email varchar(150) not null, Current_balance decimal(10,2) not null);
 drop table account;
insert into account(Acc_no,User_name,User_email,Current_balance) values(111,"Mayuri desale","mayuri@gmail.com",60000);
insert into account(Acc_no,User_name,User_email,Current_balance) values(112,"Rahul Shirsath","rahul21@gmail.com",20000);
insert into account(Acc_no,User_name,User_email,Current_balance) values(113,"Parth Thakare","parththakare@gmail.com",45000);
insert into account(Acc_no,User_name,User_email,Current_balance) values(114,"Snehal Patil","sneha95@gmail.com",34000);
insert into account(Acc_no,User_name,User_email,Current_balance) values(115,"Gauri Mahore","gaurim123@gmail.com",50000);
insert into account(Acc_no,User_name,User_email,Current_balance) values(116,"Aaditya Salunke","aadi31@gmail.com",48000);
insert into account(Acc_no,User_name,User_email,Current_balance) values(117,"Geeta Mane","geet@gmail.com",9000);
insert into account(Acc_no,User_name,User_email,Current_balance) values(118,"Sakshi Bhosale","saksh5@gmail.com",67000);
insert into account(Acc_no,User_name,User_email,Current_balance) values(119,"Piyush Patil","piyush123@gmail.com",75000);
insert into account(Acc_no,User_name,User_email,Current_balance) values(120,"Divya Chaudhari","divyac20@gmail.com",30000);
CREATE TABLE History (
    Id int NOT NULL AUTO_INCREMENT primary key,
    Sender_Name varchar(255) NOT NULL,
    Reciever_Name varchar(255) NOT NULL,
    Amount decimal(10,2) NOT NULL
);