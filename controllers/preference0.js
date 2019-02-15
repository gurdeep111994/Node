'use strict';

exports.list_preference0 = function (req, res, next) {
    res.locals.connection.query('SELECT * from preference0', function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
};


exports.save_preference0 = function (req, res, next) {
    let conn = res.locals.connection;
    if (!req.body.account_id) {
        res.send(JSON.stringify({ "status": 500, "error": "account_id field required" }));
        return;
    }
    var query = '';
    if (req.body.id) {
        var data = [
            req.body.account_id,
            req.body.size,
            req.body.body_type,
            req.body.waist,
            req.body.bra_size,
            req.body.cup_size,
            req.body.height,
            req.body.weight,
            new Date(),
            req.body.id
        ];
        query = 'UPDATE preference0 SET account_id = ? , size = ?, body_type = ?, waist = ?, bra_size = ?, cup_size = ?, height = ? ,weight = ?, updated_at = ? WHERE id = ?'
        conn.query(query, data, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "fields": fields }));
        });
    } else {
        let prefernce_data = {
            account_id: req.body.account_id,
            size: req.body.size,
            body_type: req.body.body_type,
            waist: req.body.waist,
            bra_size: req.body.bra_size,
            cup_size: req.body.cup_size,
            height: req.body.height,
            weight: req.body.weight,
            created_at: new Date(),
        };
        query = 'INSERT INTO preference0 SET ?';
        conn.query(query, prefernce_data, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        });
    }
};

exports.getById_preference0 = function (req, res, next) {
    var query = 'SELECT * from preference0 where id =' + req.params.id;
    res.locals.connection.query(query, function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
};

exports.delete_preference0 = function (req, res, next) {
    var conn = res.locals.connection;
    var query = `DELETE FROM preference0 WHERE id = ?`;
    conn.query(query, req.params.id, (error, results, fields) => {
        if (error)
            res.send(error);

        res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "affectedRows": results.affectedRows }));
    });
}