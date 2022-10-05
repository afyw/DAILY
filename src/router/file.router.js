const Router = require('koa-router');
const { verifyAuth } = require('../middleware/auth.middleware');
const { avatarHandle } = require('../middleware/file.middleware');
const { saveAvatarInfo } = require('../controller/file.controller');
const fileRouter = new Router({ prefix: '/upload' });

//  verifyAuth,
//   middle(保存图像),
//   controller(保存图像信息)

fileRouter.post('/avatar', verifyAuth, avatarHandle, saveAvatarInfo);

module.exports = fileRouter;
