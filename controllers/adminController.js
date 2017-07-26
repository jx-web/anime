// 引入操作数据的模型对象 
var categoryModel = require('../models/categoryModel');
var imgUpload = require('../configs/imgUpload_config');
var articleModel = require('../models/articleModel');

// 声明一个控制器的对象
var adminController = {};

// 首页
adminController.index = function(req,res,next){
	res.render('admin/index');
};

// 首页头部
adminController.adminTop = function(req,res,next){
	res.render('admin/top');
};

// 首页默认main
adminController.adminMain = function(req,res,next){
	res.render('admin/main');
};

// 分类管理页面
adminController.category = function(req,res,next){
	res.render('admin/category');
};

// 分类列表查看
adminController.listCategory = function(req,res,next){
	// 默认第一页
	var page = req.query.page?req.query.page:1;
	// 每页有多少条数据
	var pageSize = 4;
	// 查询文章集合所有的条数
	categoryModel.find().count(function(err,total){
		var pageMax = Math.ceil(total/pageSize);
		if(page < 1) page = 1;
		if(page > pageMax) page = pageMax;
		// 偏移量
		var pageOffset = (page - 1)*pageSize;
		categoryModel.find().limit(pageSize).skip(pageOffset).exec(function(err,data){
			res.render('admin/listCategory',{datalist:data,pageMax:pageMax,page:page});
		})		
	})	
};

// 添加分类的页面
adminController.addCategory = function(req,res,next){
	res.render('admin/addCategory');
};

// 插入添加分类的数据
adminController.insertCategory = function(req,res,next){
	var path = './uploads';
	var allImgType = ['image/jpeg','image/png','image/gif'];

	var upload = imgUpload(path,allImgType).single('img');

	upload(req,res,function(){
		req.body.img = req.file.filename;
		// console.log(req.file)
		categoryModel.create(req.body,function(err){
			if(err){
				console.log('操作失败');
			}else{
				console.log('ok');
				res.redirect('/admin/listCategory');
			}
		})		
	})
};

// 修改分类的页面
adminController.editCategory = function(req,res,next){
	//查询数据  find(回调函数)
	categoryModel.findOne(req.params,function(err,data) {
		if(err){
			console.log('操作失败');
		}else{
			res.render('admin/editCategory',{data:data});
		}					
	})
};

//  修改分类的数据
adminController.updateCategory = function (req,res,next) {
    var path = './uploads';
    var allImgType = ['image/jpeg','image/png','image/gif'];
    var upload = imgUpload(path,allImgType).single('newimg');

    upload(req,res,function () {
        if(req.file !== undefined){
            req.body.img = req.file.filename;
            // console.log(req.file.filename);
        }
        // console.log(req.file)
        var tj = {_id:req.body._id};
        categoryModel.update(tj,req.body,function(err){
            if(err){
                console.log('操作失败');
            }else{
                console.log('ok');
                res.redirect('/admin/listCategory');
            }
        })
    });
};

// 删除分类
adminController.delData = function(req,res,next){
	categoryModel.remove(req.params,function(err,data) {
		if(err){
			console.log('操作失败');
		}else{
			res.redirect('/admin/listCategory');
		}					
	})	
};

// 文章管理页面
adminController.article = function(req,res,next){
	res.render('admin/article');
};

// 添加文章
adminController.addArticle = function(req,res,next){
	categoryModel.find(function(err,data){
		if(err){
			console.log('操作失败');
		}else{
			res.render('admin/addArticle',{datalist:data});		
		}
	})
};

// 插入添加文章的数据
adminController.insertArticle = function(req,res,next){
	var path = './uploads';
	var allImgType = ['image/jpeg','image/png','image/gif'];

	var upload = imgUpload(path,allImgType).single('cover');

	upload(req,res,function(){
		req.body.cover = req.file.filename;
		// console.log(req.file)
		articleModel.create(req.body,function(err){
			if(err){
				console.log('操作失败');
			}else{
				console.log('ok');
				res.redirect('/admin/listArticle');
			}
		})		
	})	
};

// 文章列表查看
adminController.listArticle = function(req,res,next){
	// 默认第一页
	var page = req.query.page?req.query.page:1;
	// 每页有多少条数据
	var pageSize = 4;
	// 查询文章集合所有的条数
	articleModel.find().count(function(err,total){
		var pageMax = Math.ceil(total/pageSize);
		if(page < 1) page = 1;
		if(page > pageMax) page = pageMax;
		// 偏移量
		var pageOffset = (page - 1)*pageSize;
		articleModel.find().populate('categoryId',{name:1}).limit(pageSize).skip(pageOffset).exec(function(err,data){
			res.render('admin/listArticle',{datalist:data,pageMax:pageMax,page:page});
		})		
	})
};

//	修改文章的页面
adminController.editArticle = function (req,res,next) {
    articleModel.findOne(req.params).populate('categoryId',{name:1}).exec(function(err,data){
        // console.log(req.params);
        if(err){
            console.log('操作失败');
        }else{
            categoryModel.find(function(err,data1){
                if(err){
                    console.log(err)
                }else{
                    // console.log(data1);
                    // console.log(data);
                    res.render('admin/editArticle',{datalist:data1,data:data});
                }
            });
        }
    })
};

//	修改文章的数据
adminController.updateArticle = function (req,res,next) {
    var path = './uploads';
    var allImgType = ['image/jpeg','image/png','image/gif'];
    var upload = imgUpload(path,allImgType).single('newcover');

    upload(req,res,function () {
        if(req.file !== undefined){
            req.body.cover = req.file.filename;
            // console.log(req.file.filename);
        }
        // console.log(req.file)
        var tj = {_id:req.body._id};
        articleModel.update(tj,req.body,function(err){
            if(err){
                console.log('操作失败');
            }else{
                console.log('ok');
                res.redirect('/admin/listArticle');
            }
        })
    });
};


module.exports = adminController;