// 引入数据库的配置文件  
var mongoose = require('../configs/db_configs');

// 定义集合的骨架
var categorySchema = new mongoose.Schema({
	name : {
		type: String,
		unique: true,
	},
	createTime:{
		type : Date,
		default : new Date(),
	},
	order : {
		type : Number,
		default : 0,
	},
	img : {
		type : String,
		default : '',
	},
});

// 创建模型对象 操作集合
var categoryModel = mongoose.model('category',categorySchema);


module.exports = categoryModel;