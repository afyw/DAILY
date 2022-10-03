const Router = require('koa-router');

const {
  verifyAuth,
  verifyPermisson
} = require('../middleware/auth.middleware');
const {
  create,
  reply,
  update,
  remove
} = require('../controller/comment.controller.js');
const commentRouter = new Router({ prefix: '/comment' });

commentRouter.post('/', verifyAuth, create);
commentRouter.post('/:commentId/reply', verifyAuth, reply);

// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermisson, update);
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermisson, remove);

module.exports = commentRouter;
