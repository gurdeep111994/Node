'use strict';

exports.list = function (req, res, next) {
    res.locals.connection.query('SELECT * from orders', function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
};


exports.save = function (req, res, next) {
    let conn = res.locals.connection;
    var query = '';
    if (req.body.id) {
        var data = [
            req.body.account_id,
            req.body.gender,
            req.body.payment_type,
            req.body.plan,
            req.body.status,
            req.body.to_be_shipped_date,
            req.body.shipped_date,
            new Date(),
            req.body.id
        ];
        query = 'UPDATE orders SET account_id = ? , gender = ?,payment_type = ? , plan = ? , status = ?, to_be_shipped_date = ?, shipped_date= ?, updated_at = ? WHERE id = ?'
        conn.query(query, data, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "fields": fields }));
        });
    } else {
        let data = {
            account_id: req.body.account_id,
            gender: req.body.gender,
            payment_type: req.body.payment_type,
            plan: req.body.plan,
            status: req.body.status,
            to_be_shipped_date: req.body.to_be_shipped_date,
            shipped_date: req.body.shipped_date,
            created_at: new Date(),
        };
        query = 'INSERT INTO orders SET ?';
        conn.query(query, data, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        });
    }
};

exports.getById = function (req, res, next) {
    var query = 'SELECT * from orders where id =' + req.params.id;
    res.locals.connection.query(query, function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
};

exports.delete = function (req, res, next) {
    var conn = res.locals.connection;
    var query = `DELETE FROM orders WHERE id = ?`;
    conn.query(query, req.params.id, (error, results, fields) => {
        if (error)
            res.send(error);

        res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "affectedRows": results.affectedRows }));
    });
}