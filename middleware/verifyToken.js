var jwt = require('jsonwebtoken');

exports.tokenVerification = function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        // Get token from away
        const bearerToken = bearer[1];
        req.token = bearerToken;
        
        jwt.verify(bearerToken, 'secretKey', (err, authdata) => {
            if (err) {
                res.sendStatus(401);
            } else {
                next();
            }
        })
    } else {
        // unauthorized
        res.sendStatus(401);
    }

}