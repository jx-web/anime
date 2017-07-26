// 使用mongoose连接mongodb  加载mongoose模块
var mongoose = require('mongoose');

// 定义数据库的地址
var dbUrl = 'mongodb://localhost:27017/haotaici';

mongoose.connect(dbUrl,function(err){
	if(err){
		console.log('数据库连接失败');
	}
})

module.exports = mongoose;
