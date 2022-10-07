const Router = require('koa-router');
const { verifyAuth } = require('../middleware/auth.middleware');
const {
  avatarHandle,
  pictureHandle,
  pictureResize
} = require('../middleware/file.middleware');
const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controller/file.controller');
const fileRouter = new Router({ prefix: '/upload' });

//  verifyAuth,
//   middle(保存图像),
//   controller(保存图像信息)

fileRouter.post('/avatar', verifyAuth, avatarHandle, saveAvatarInfo);
fileRouter.post(
  '/picture',
  verifyAuth,
  pictureHandle,
  pictureResize,
  savePictureInfo
);
module.exports = fileRouter;
