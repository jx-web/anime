// 引入数据库的配置文件 
var mongoose = require('../configs/db_configs');

// 定义集合的骨架
var articleSchema = new mongoose.Schema({
	categoryId : {
		type: 'ObjectId',
		// 关联到哪个集合
		ref: 'category',
	},
	title : {
		type: String,
		default :'',
	},
	author : {
		type: String,
		default: '',
	},
	createTime : {
		type: Date,
		default: new Date(),
	},
	cover : {
		type: String,
		default: '',
	},
	content : {
		type: String,
		default:'',
	},
});

// 创建模型对象 操作集合
var articleModel = mongoose.model('article',articleSchema);

// 暴露操作数据的模型对象
module.exports = articleModel;