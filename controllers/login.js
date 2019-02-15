'use strict';
const jwt = require('jsonwebtoken');

exports.login = function (req, res, next) {
    let conn = res.locals.connection;
    if (!req.body.mobile_number && !req.body.password) {
        res.send(JSON.stringify({ "status": 500, "error": "mobile number and password field required" }));
        return;
    }
    conn.query(`SELECT * FROM account WHERE mobile_number='${req.body.mobile_number}' && password='${req.body.password}'`, function (error, existingAccount, fields) {
        if (error) { res.send(error); }
        // Return if email already exists
        if (existingAccount && existingAccount.length > 0) {
            const user = {
                id: existingAccount[0].id,
                username: existingAccount[0].name,
                email: existingAccount[0].email
            }
            jwt.sign({ user: user }, 'secretKey', (er, token) => {
                res.send(JSON.stringify({ "status": 200, "token": token }));
            });
        } else {
            res.send(JSON.stringify({ "status": 401, "error": "mobile number and password is incorrect." }));
        }
    });

}
