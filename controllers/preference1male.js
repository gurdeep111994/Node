'use strict';

exports.list_preference1male = function (req, res, next) {
    res.locals.connection.query('SELECT * from preference1male', function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
};


exports.save_preference1male = function (req, res, next) {
    let conn = res.locals.connection;
    if (!req.body.account_id) {
        res.send(JSON.stringify({ "status": 500, "error": "account id field required" }));
        return;
    }
    var query = '';
    var dataToSend;
    if (req.body.id) {
        dataToSend = [
            req.body.account_id,
            req.body.tshirt,
            req.body.shirt,
            req.body.blazer,
            req.body.jacket,
            req.body.officewear,
            req.body.partywear,
            req.body.belt,
            req.body.tie,
            req.body.wallet,
            new Date(),
            req.body.id
        ];
        query = 'UPDATE preference1male SET account_id = ? , tshirt = ?, shirt = ?, blazer = ?, jacket = ?, officewear = ?, partywear = ? ,belt = ?, tie = ?, wallet= ?, updated_at = ? WHERE id = ?'
        conn.query(query, dataToSend, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "fields": fields }));
        });
    } else {
        dataToSend = {
            account_id: req.body.account_id,
            tshirt: req.body.tshirt,
            shirt: req.body.shirt,
            blazer: req.body.blazer,
            jacket: req.body.jacket,
            officewear: req.body.officewear,
            partywear: req.body.partywear,
            belt: req.body.belt,
            tie: req.body.tie,
            wallet: req.body.wallet,
            created_at: new Date()
        };
        query = 'INSERT INTO preference1male SET ?';
        conn.query(query, dataToSend, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        });
    }
};

exports.getById_preference1male = function (req, res, next) {
    var query = 'SELECT * from preference1male where id =' + req.params.id;
    res.locals.connection.query(query, function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
};


exports.delete_preference1male = function (req, res, next) {
    var conn = res.locals.connection;
    var query = `DELETE FROM preference1male WHERE id = ?`;
    conn.query(query, req.params.id, (error, results, fields) => {
        if (error)
            res.send(error);

        res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "affectedRows": results.affectedRows }));
    });
}