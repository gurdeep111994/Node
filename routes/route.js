var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken')

var userController = require('../controllers/user');
var addressController = require('../controllers/address');
var preferenceController = require('../controllers/preference0');
var preference1femaleController = require('../controllers/preference1female');
var preference1maleController = require('../controllers/preference1male');
var sendotpController = require('../controllers/sendotp');
var loginController = require('../controllers/login');
var statusController = require('../controllers/status');
var planController = require('../controllers/plan');
var orderController = require('../controllers/order');

var api = '/api/v1/'
/* GET home page. */
router.all('').get('/', function (req, res, next) {
    res.render('index', { title: 'Style Cracker' });
}).get(`${api}users/`, verifyToken.tokenVerification, userController.list_users).post(`${api}users/`, userController.save_user)
    .get(`${api}addreses/`, verifyToken.tokenVerification, addressController.list_addresses).post(`${api}addreses/`, verifyToken.tokenVerification, addressController.save_address)
    .get(`${api}addreses/:id`, verifyToken.tokenVerification, addressController.getById_address).delete(`${api}addreses/:id`, verifyToken.tokenVerification, addressController.delete_address)
    .get(`${api}preference0/`, verifyToken.tokenVerification, preferenceController.list_preference0).post(`${api}preference0/`, verifyToken.tokenVerification, preferenceController.save_preference0)
    .get(`${api}preference0/:id`, verifyToken.tokenVerification, preferenceController.getById_preference0).delete(`${api}preference0/:id`, verifyToken.tokenVerification, preferenceController.delete_preference0)
    .get(`${api}preference1Female/`, verifyToken.tokenVerification, preference1femaleController.list_preference1Female).post(`${api}preference1Female/`, verifyToken.tokenVerification, preference1femaleController.save_preference1Female)
    .get(`${api}preference1Female/:id`, verifyToken.tokenVerification, preference1femaleController.getById_preference1Female).delete(`${api}preference1Female/:id`, verifyToken.tokenVerification, preference1femaleController.delete_preference1Female)
    .get(`${api}preference1Male/`, verifyToken.tokenVerification, preference1maleController.list_preference1male).post(`${api}preference1Male/`, verifyToken.tokenVerification, preference1maleController.save_preference1male)
    .get(`${api}preference1Male/:id`, verifyToken.tokenVerification, preference1maleController.getById_preference1male).delete(`${api}preference1Male/:id`, verifyToken.tokenVerification, preference1maleController.delete_preference1male)
    .post(`${api}sendOtp/`, sendotpController.send_otp).post(`${api}users/verifyOtp`, sendotpController.verification_otp)
    .post(`${api}login/`, loginController.login)
    .get(`${api}status/`, verifyToken.tokenVerification, statusController.list).post(`${api}status/`, verifyToken.tokenVerification, statusController.save)
    .get(`${api}status/:id`, verifyToken.tokenVerification, statusController.getById).delete(`${api}status/:id`, verifyToken.tokenVerification, statusController.delete)
    .get(`${api}plan/`, verifyToken.tokenVerification, planController.list).post(`${api}plan/`, verifyToken.tokenVerification, planController.save)
    .get(`${api}plan/:id`, verifyToken.tokenVerification, planController.getById).delete(`${api}plan/:id`, verifyToken.tokenVerification, planController.delete)
    .get(`${api}order/`, verifyToken.tokenVerification, orderController.list).post(`${api}order/`, verifyToken.tokenVerification, orderController.save)
    .get(`${api}order/:id`, verifyToken.tokenVerification, orderController.getById).delete(`${api}order/:id`, verifyToken.tokenVerification, orderController.delete)

module.exports = router;