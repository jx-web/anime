// 引入 multer 模块 
var multer  = require('multer');
var path = require('path');
var timestamp = require('time-stamp');
// 生成唯一的 id
var uid =  require('uid');

function imgUpload(savePath,allImgType){
// 控制文件的存储
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, savePath);
    },
    filename: function (req, file, cb) {
      var extname = path.extname(file.originalname);

      cb(null, file.fieldname + '-' + timestamp('YYYYMMDD')+timestamp('HH')+uid()+extname);
    }
  })

  // 上传文件的过滤函数
  function fileFilter (req, file, cb) {

    // var allImgType = ['image/jpeg','image/png','image/gif'];

    if(allImgType.indexOf(file.mimetype) == -1){
      // 拒绝这个文件，使用`false`
      cb(null, false)
      cb(new Error('I don\'t have a clue!'))
    }else{
      // 接受这个文件，使用`true`
      cb(null, true)
    }
    // console.log(file.mimetype)
  }

  var upload = multer({ storage: storage,fileFilter: fileFilter })  
  return upload;
}
module.exports = imgUpload;