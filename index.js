/*jshint esversion:6*/
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public")); 

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});


app.get("/transaction", function (request, response) {

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "pranjal123",
        database: "sparks_bank",
        
    });
    con.connect(function (err) {
        if (err) throw err;
        let sql = "select * from account";
        con.query(sql, function (err, result) {
            if (err) throw err;
            
            response.render('transaction', { list: result });
        });
    });
});

app.get("/transaction/:number/:name",function(req,res){
    var accountNo = req.params.number;
    var accountHolderName = req.params.name;
    let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "pranjal123",
            database: "sparks_bank",

    });
    con.connect(function (err) {
        if (err) throw err;
        let sql = "select * from account where Acc_no = " + accountNo + " and User_name= '"+accountHolderName+ "'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result && result.length) {
                res.send('{"isThere":true}');
            } else {
                res.send('{"isThere":false}');
            }
        });
    });
});

app.post("/transaction", function (req, res) {
    var senderName = req.body.SenderName;
    var senderAccount = req.body.SenderAccount;
    var receiverName = req.body.ReceiverName;
    var receiverAccount = req.body.ReceiverAccount;
    const amount = req.body.MoneyTransfer;

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "pranjal123",
        database: "sparks_bank",

    });
    con.connect(function (err) {
        if (err) throw err;
        let sql = "select * from account where Acc_no = " + senderAccount+ " and User_name ='"+ senderName+"'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result && result.length) {
                let sql1 = "select * from account where Acc_no = " + receiverAccount + " and User_name ='" + receiverName+"'";
                con.query(sql1, function (err1, result1) {
                    if (err1) throw err1;
                    if (result1 && result1.length) {
                        var senderBalance = result[0].Current_balance;
                        var receiverBalance = result1[0].Current_balance;
                        senderBalance -= parseFloat(amount);
                        receiverBalance += parseFloat(amount);
                        var sql2 = "update account set Current_balance = " + parseInt(senderBalance) + " where Acc_no = " + parseInt(senderAccount) ;
                        con.query(sql2, function(err2,result){
                            if(err2){
                                throw err2;
                            }
                        });
                        var sql3 = "update account set Current_balance = " + parseInt(receiverBalance) + " where Acc_no = " + parseInt(receiverAccount);
                        con.query(sql3, function (err3, res) {
                            if (err3) {
                                throw err3;
                            }
                        });
                        var sql4 = "insert into history(Sender_Name, Reciever_Name, Amount) values (?,?,?)"
                        con.query(sql4, [senderName, receiverName, amount], function (err4, historyResult) {
                            if (err4) {
                                throw err4;
                            }
                        });
                    } else {
                        //invalid account holder
                    }
                });
            } else {
                //invalid account holder
            }
        });
    });

    // res.redirect("/");
});


app.get("/history", function (request, response) {

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "pranjal123",
        database: "sparks_bank",

    });
    con.connect(function (err) {
        if (err) throw err;
        let sql = "select * from history";
        con.query(sql, function (err, result) {
            if (err) throw err;
            response.render('history', { list: result });
        });
    });
});

app.listen(3000, function () {
    console.log("server started on port 3000");
});