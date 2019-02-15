'use strict';

exports.list_addresses = function (req, res, next) {
    res.locals.connection.query('SELECT * from address', function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
};

exports.save_address = function (req, res, next) {
    let conn = res.locals.connection;
    if (!req.body.account_id || !req.body.name) {
        res.send(JSON.stringify({ "status": 500, "error": "Both name and account_id fields are required" }));
        return;
    }
    var query = '';
    if (req.body.id) {
        var data = [
            req.body.name,
            req.body.account_id,
            req.body.address1,
            req.body.address2,
            req.body.landmark,
            req.body.city,
            req.body.state,
            req.body.pin,
            new Date(),
            req.body.id
        ];
        query = 'UPDATE address SET name = ? , account_id = ?, address1 = ?, address2 = ?, landmark = ?, city = ?, state = ? ,pin = ?, updated_at = ? WHERE id = ?'
        conn.query(query, data, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "fields": fields }));
        });
    } else {
        let address_data = {
            name: req.body.name,
            account_id: req.body.account_id,
            address1: req.body.address1,
            address2: req.body.address2,
            landmark: req.body.landmark,
            city: req.body.city,
            state: req.body.state,
            pin: req.body.pin,
            created_at: new Date()
        };
        query = 'INSERT INTO address SET ?';
        conn.query(query, address_data, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        });
    }
};

exports.getById_address = function (req, res, next) {
    var query = 'SELECT * from address where id =' + req.params.id;
    res.locals.connection.query(query, function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
};

exports.delete_address = function (req, res, next) {
    var conn = res.locals.connection;
    var query = `DELETE FROM address WHERE id = ?`;
    conn.query(query, req.params.id, (error, results, fields) => {
        if (error)
            res.send(error);

        res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "affectedRows": results.affectedRows }));
    });
}
