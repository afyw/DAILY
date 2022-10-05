const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const {
  create,
  detail,
  list,
  updateMoment,
  deleteMoment,
  addLabels
} = require('../controller/moment.controller.js');
const {
  verifyAuth,
  verifyPermisson
} = require('../middleware/auth.middleware');

// 处理新添加的标签不在表中的情况
const { verfyLabelExists } = require('../middleware/label.middleware');
momentRouter.post('/', verifyAuth, create);
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);
// 1.用户必须登录  2.用户必须具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermisson, updateMoment);
momentRouter.delete('/:momentId', verifyAuth, verifyPermisson, deleteMoment);

// 给动态添加标签的接口
momentRouter.post(
  '/:momentId/labels',
  verifyAuth,
  verifyPermisson,
  verfyLabelExists,
  addLabels
);


module.exports = momentRouter;
