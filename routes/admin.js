var express = require('express');  
var router = express.Router();

// 引入控制器模块
var adminController = require('../controllers/adminController');

/* 首页 */
router.get('/',adminController.index);

/* 首页头部 */
router.get('/adminTop',adminController.adminTop);

/* 首页默认 main */
router.get('/adminMain',adminController.adminMain);

/* 分类管理页面 */
router.get('/category',adminController.category);

/* 分类列表查看 */
router.get('/listCategory',adminController.listCategory); 

/* 添加分类 */
router.get('/addCategory',adminController.addCategory);

/* 插入添加分类的数据 */
router.post('/insertCategory',adminController.insertCategory);

/* 修改分类的页面 */
router.get('/editCategory/:_id',adminController.editCategory);

/* 修改分类的数据 */
router.post('/updateCategory',adminController.updateCategory);

/* 删除分类 */
router.get('/delData/:_id',adminController.delData);

/* 文章管理页面 */
router.get('/article',adminController.article);

/* 文章列表查看 */
router.get('/listArticle',adminController.listArticle);

/* 添加文章的页面 */
router.get('/addArticle',adminController.addArticle);

/* 插入添加文章的数据 */
router.post('/insertArticle',adminController.insertArticle);

/* 修改文章的页面 */
router.get('/editArticle/:_id',adminController.editArticle);

/* 修改文章的数据 */
router.post('/updateArticle',adminController.updateArticle);


module.exports = router;
