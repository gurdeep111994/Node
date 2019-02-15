var config = require("../config/config.json");
var msg91 = require("msg91")(config.msg91.authKey, config.msg91.senderId, config.msg91.routeId);

exports.send_otp = function (req, res, next) {
    let conn = res.locals.connection;
    if (!req.body.id || !req.body.mobileNo) {
        res.send(JSON.stringify({ "status": 500, "error": "id and mobile No field are required" }));
        return;
    }

    conn.query(`SELECT * FROM account WHERE id='${req.body.id}'`, function (error, existingAccount, fields) {
        if (error) {
            res.send(error);
        }
        if (existingAccount.length < 1) {
            res.send(JSON.stringify({ "status": 500, "error": "Account does not exists" }));
            return;
        }
        var mobileNo = req.body.mobileNo;
        var otp = Math.floor(1000 + Math.random() * 9000);
        dataToSend = [
            otp,
            new Date(),
            req.body.id,
        ];
        query = 'UPDATE account SET otp = ? , updated_at = ? WHERE id = ?'
        conn.query(query, dataToSend, function (er, results, fields) {
            if (er) {
                res.send(er);
            }
            console.log(JSON.stringify({ "status": 200, "error": null, "response": results, "fields": fields }));
            var sendPhoneMessage = otp + " is your Style Cracker verification code."
            console.log(sendPhoneMessage);
            msg91.send(mobileNo, sendPhoneMessage, function (err, response) {
                if (err) {
                    res.send(err);
                }
                res.send(JSON.stringify({ "status": 200, "success": "Please check your phone for a text message with your code. Your code is 4 characters in length" }));
            });
        });
    });
}

exports.verification_otp = function (req, res, next) {
    let conn = res.locals.connection;
    if (!req.body.id || !req.body.otp) {
        res.send(JSON.stringify({ "status": 500, "error": "id and otp field are required" }));
        return;
    }

    conn.query(`SELECT * FROM account WHERE id='${req.body.id}' and otp ='${req.body.otp}'`, function (error, existingAccount, fields) {
        if (error) {
            res.send(error);
        }
        if (existingAccount.length > 0) {
            res.send(JSON.stringify({ "status": 500, "error": "Your account is verified" }));
            return;
        } else {
            res.send(JSON.stringify({ "status": 500, "error": "Account does not exists" }));
        }
    });
}