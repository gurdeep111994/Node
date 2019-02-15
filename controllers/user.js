'use strict';
var config = require("../config/config.json");
var msg91 = require("msg91")(config.msg91.authKey, config.msg91.senderId, config.msg91.routeId);

exports.list_users = function (req, res, next) {
    res.locals.connection.query('SELECT * from account', function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
};

exports.save_user = function (req, res, next) {

    let conn = res.locals.connection;
    //Check if name or mobile_number is empty, If yes then return error
    if (!req.body.name || !req.body.mobile_number) {
        res.send(JSON.stringify({ "status": 500, "error": "Both name and mobile_number fields are required" }));
        return;
    }

    //Check if account email already exists?
    if (!req.body.id) {
        conn.query(`SELECT * FROM account WHERE mobile_number='${req.body.mobile_number}'`, function (error, existingAccount, fields) {
            if (error) { res.send(error); }
            // Return if email already exists
            if (existingAccount.length > 0) {
                res.send(JSON.stringify({ "status": 500, "error": "Mobile number already exists" }));
                return;
            }
            var otp = Math.floor(1000 + Math.random() * 9000);
            var mobileNo = req.body.mobile_number;
            //preparing account data 
            let account_data = {
                name: req.body.name,
                email: req.body.email,
                mobile_number: req.body.mobile_number,
                gender: req.body.gender == 'male' ? 1 : 0,
                birthday: req.body.birthday,
                status: 0,
                otp: otp,
                created_at: new Date(),
                password: req.body.password
            };
            //Finally account creation
            conn.query('INSERT INTO account SET ?', account_data, function (error, results, fields) {
                if (error) {
                    res.send(error);
                }
                var sendPhoneMessage = otp + " is your Style Cracker verification code."
                msg91.send(mobileNo, sendPhoneMessage, function (err, response) {
                    if (err) {
                        res.send(err);
                    }
                    res.send(JSON.stringify({ "status": 200, "AccountId": results.insertId, "success": "Please check your phone for a text message with your code. Your code is 4 characters in length" }));
                });
                // res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            });
        });
    }
    var query = '';
    var dataToSend;
    if (req.body.id) {
        dataToSend = [
            req.body.name,
            req.body.email,
            req.body.mobile_number,
            req.body.gender == 'male' ? 1 : 0,
            req.body.birthday,
            req.body.status,
            new Date(),
            req.body.id
        ];
        query = 'UPDATE account SET name = ? , email = ?, mobile_number = ?, gender = ?, birthday = ?, status = ?, updated_at = ? WHERE id = ?'
        conn.query(query, dataToSend, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "fields": fields }));
        });
    }

}