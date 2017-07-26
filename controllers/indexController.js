// 引入操作数据的模型对象
var categoryModel = require('../models/categoryModel');
var articleModel = require('../models/articleModel');
var userModel = require('../models/userModel');

// 声明一个控制器的对象
var indexController = {};

indexController.index = function(req,res,next){
	
	categoryModel.find(function(err,data){
		// console.log(data);
		if(err){
			console.log('查询失败');
		}else{
			// console.log(data);
			articleModel.find().populate('categoryId',{name:1}).exec(function(err,data1){
				// console.log(data1)
				res.render('index',{items:data,data:data1});
			})			
		}
	})
};

// 注册页面
indexController.register = function(req,res,next){
	res.render('register');
};

//  注册数据
indexController.doRegister = function (req,res,next) {
    var username = req.body.username.trim();
    var password = req.body.password.trim();
    // 给密码加密
    // 1. 引入加密模块
    var crypto = require('crypto');
    // 选加密的方法
    var md5 = crypto.createHash('md5');
    // 开始加密字符串
    md5.update(password);
    // 输出加密后的字符串
    var md5Password = md5.digest('hex');
    // 把数据插入到管理员的集合里。
    userModel.create({username:username,password:md5Password},function(err){
        if(err){
            res.send('no');
        }else{
            res.send('ok');
        }
    });
};

// 登录的页面
indexController.login = function(req, res, next) {
    res.render('login');
};

indexController.doLogin = function(req, res, next) {
    // 去掉字符串两端的空白字符
    var username = req.body.username.trim();
    var password = req.body.password.trim();
    // 给密码加密
    // 1. 引入加密模块
    var crypto = require('crypto');
    // 选加密的方法
    var md5 = crypto.createHash('md5');
    // 开始加密字符串
    md5.update(password);
    // 输出加密后的字符串
    var md5Password = md5.digest('hex');

    userModel.findOne({username:username,password:md5Password},function(err,data){

        if(err){
            res.send('no');
        }else{
            // 登录成功 把 数据 写 session 里
            // console.log(data)
            req.session.user = data;
            res.send('ok');
        }
    })
};

//  退出登录
indexController.logout = function (req,res,next) {
    // 退出登录时清空 session
    req.session.user = null;
    res.redirect('/login');
};

module.exports = indexController;