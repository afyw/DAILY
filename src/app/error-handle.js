const errorTypes = require('../constants/error-types');
const errorHandle = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; //bad request
      message = '用户名或密码不能为空~';
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409; //conflict
      message = '用户名已经存在~';
      break;
    default:
      status = 404;
      message = 'NOT Found';
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandle;
