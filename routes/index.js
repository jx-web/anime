var express = require('express');
var router = express.Router();

// 引入控制器模块
var indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.index);


/* 注册页面 */
router.get('/register',indexController.register);

/* 注册 */
router.post('/doRegister',indexController.doRegister);

/* 登录页面 */
router.get('/login',indexController.login);

/* 登录操作 */
router.post('/doLogin',indexController.doLogin);

/* 退出登录 */
router.get('/logout',indexController.logout);

module.exports = router;
