'use strict';

exports.list_preference1Female = function (req, res, next) {
    res.locals.connection.query('SELECT * from preference1female', function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
};


exports.save_preference1Female = function (req, res, next) {
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
            req.body.dress,
            req.body.top,
            req.body.kurti,
            req.body.blazer,
            req.body.officewear,
            req.body.jacket,
            req.body.partywear,
            req.body.bags,
            req.body.jewelry,
            req.body.shoes,
            new Date(),
            req.body.id
        ];
        query = 'UPDATE preference1female SET account_id = ? , dress = ?, top = ?, kurti = ?, blazer = ?, officewear = ?, jacket = ? ,partywear = ?, bags = ?, jewelry= ?, shoes= ? , updated_at = ? WHERE id = ?'
        conn.query(query, dataToSend, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "fields": fields }));
        });
    } else {
        dataToSend = {
            account_id: req.body.account_id,
            dress: req.body.dress,
            top: req.body.top,
            kurti: req.body.kurti,
            blazer: req.body.blazer,
            officewear: req.body.officewear,
            jacket: req.body.jacket,
            partywear: req.body.partywear,
            bags: req.body.bags,
            jewelry: req.body.jewelry,
            shoes: req.body.shoes,
            created_at: new Date()
        };
        query = 'INSERT INTO preference1female SET ?';
        conn.query(query, dataToSend, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        });
    }
};

exports.getById_preference1Female = function (req, res, next) {
    var query = 'SELECT * from preference1female where id =' + req.params.id;
    res.locals.connection.query(query, function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
};

exports.delete_preference1Female = function (req, res, next) {
    var conn = res.locals.connection;
    var query = `DELETE FROM preference1female WHERE id = ?`;
    conn.query(query, req.params.id, (error, results, fields) => {
        if (error)
            res.send(error);

        res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "affectedRows": results.affectedRows }));
    });
}