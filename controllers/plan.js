'use strict';

exports.list = function (req, res, next) {
    res.locals.connection.query('SELECT * from plan', function (error, results, fields) {
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
            req.body.plan,
            req.body.value,
            new Date(),
            req.body.id
        ];
        query = 'UPDATE plan SET plan = ? , value = ?, updated_at = ? WHERE id = ?'
        conn.query(query, data, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "fields": fields }));
        });
    } else {
        let data = {
            plan: req.body.plan,
            value: req.body.value,
            created_at: new Date(),
        };
        query = 'INSERT INTO plan SET ?';
        conn.query(query, data, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        });
    }
};

exports.getById = function (req, res, next) {
    var query = 'SELECT * from plan where id =' + req.params.id;
    res.locals.connection.query(query, function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
};

exports.delete = function (req, res, next) {
    var conn = res.locals.connection;
    var query = `DELETE FROM plan WHERE id = ?`;
    conn.query(query, req.params.id, (error, results, fields) => {
        if (error)
            res.send(error);

        res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "affectedRows": results.affectedRows }));
    });
}