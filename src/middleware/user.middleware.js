const errorType = require('../constants/error-types');
const service = require('../service/user.service');
const md5password = require('../utils/password-handle');
const verifyUser = async (ctx, next) => {
  // 对用户账号和密码处理
  // 1.获取用户账号和密码
  const { name, password } = ctx.request.body;
  console.log('验证账户密码');
  //   2.判断两者都非空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  //   3.判断这次注册的用户名是没有被注册过的
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
};

const handlePassword = async (ctx, next) => {
  console.log('加密处理');
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword
};
