// 引入数据库的配置文件
var mongoose = require('../configs/db_configs');

// 定义集合的骨架
var userSchema = new mongoose.Schema({
    username : String,
    password : String,
});

// 创建模型对象 操作集合
var userModel = mongoose.model('user',userSchema);

// 暴露操作数据的模型对象
module.exports = userModel;