const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const {
  create,
  detail,
  list,
  updateMoment,
  deleteMoment
} = require('../controller/moment.controller.js');
const {
  verifyAuth,
  verifyPermisson
} = require('../middleware/auth.middleware');

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);
// 1.用户必须登录  2.用户必须具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermisson, updateMoment);
momentRouter.delete('/:momentId', verifyAuth, verifyPermisson, deleteMoment);
module.exports = momentRouter;
