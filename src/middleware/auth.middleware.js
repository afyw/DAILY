const jwt = require('jsonwebtoken');

const errorType = require('../constants/error-types');
const userService = require('../service/user.service');
const authService = require('../service/auth.service');
const md5password = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config');
const verifyLogin = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;
  // 2.判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 3.判断用户名是否存在
  const result = await userService.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  // 4.判断与数据库密码是否一致
  if (md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRECT);
    return ctx.app.emit('error', error, ctx);
  }

  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  console.log('验证授权的middleware~');

  //1.获取token
  const authorization = ctx.headers.authorization;
  //   此处可能存在authorization为空的情况
  if (!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }

  const token = authorization.replace('Bearer ', '');
  //2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorType.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }
};

/* 
    接口：业务接口/后台管理系统
    一对一：user-> role
    多对多：role-> menu(删除动态/修改动态)
*/

// 1.思路一：闭包实现在下一层传入tableName
// const verifyPermisson = (tableName) => {
//   return async (ctx, next) => {
//     console.log('判断用户是否有权限修改content~');

//     //   1.获取参数
//     const { momentId } = ctx.params;
//     const { id } = ctx.user;
//     //   查询是否具备权限
//     try {
//       const isPermisson = await authService.checkResource(
//         tableName,
//         momentId,
//         id
//       );
//       if (!isPermisson) throw new Error();
//       await next();
//     } catch (err) {
//       const error = new Error(errorType.UNPERMISSION);
//       return ctx.app.emit('error', error, ctx);
//     }
//   };
// };
const verifyPermisson = async (ctx, next) => {
  console.log('判断用户是否有权限修改content~');

  //   1.获取参数
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace('Id', '');
  const resourceId = ctx.params[resourceKey];
  const { momentId } = ctx.params;
  const { id } = ctx.user;
  //   查询是否具备权限
  try {
    const isPermisson = await authService.checkResource(
      tableName,
      resourceId,
      id
    );
    if (!isPermisson) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(errorType.UNPERMISSION);
    return ctx.app.emit('error', error, ctx);
  }
};
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermisson
};
