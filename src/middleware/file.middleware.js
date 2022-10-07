const Multer = require('koa-multer');

const Jimp = require('jimp');
const path = require('path');
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path');
const { slice } = require('lodash');
const avatarStorage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATAR_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const avatarUpload = Multer({
  storage: avatarStorage
});

// 使用storeageDisk必须保证保存的文件夹存在
const picStorage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PICTURE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const picUpload = Multer({
  storage: picStorage
});

const avatarHandle = avatarUpload.single('avatar');

const pictureHandle = picUpload.array('picture', 8);

const pictureResize = async (ctx, next) => {
  // 1.获取所有图像的信息
  const files = ctx.req.files;
  // 2.对图像进行处理(sharp/jimp)
  for (let file of files) {
    const destPath = path.join(file.destination, file.filename);
    Jimp.read(file.path).then((image) => {
      const resImage = destPath.split('.');
      let largeImage = resImage[0] + '-large.' + resImage[1];
      let middleImage = resImage[0] + '-middle.' + resImage[1];
      let smallImage = resImage[0] + '-small.' + resImage[1];
      image.resize(1280, Jimp.AUTO).write(largeImage);
      image.resize(640, Jimp.AUTO).write(middleImage);
      image.resize(320, Jimp.AUTO).write(smallImage);
    });
  }
  await next();
};
module.exports = {
  avatarHandle,
  pictureHandle,
  pictureResize
};
