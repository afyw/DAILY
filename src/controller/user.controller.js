const fs = require('fs');
const service = require('../service/user.service');
const fileService = require('../service/file.service');
const { AVATAR_PATH } = require('../constants/file-path');

class UserController {
  async create(ctx, next) {
    // 1.获取用户请求传递的参数
    const user = ctx.request.body;
    // 2.查询数据库
    const result = await service.create(user);
    // 3.返回数据
    ctx.body = result;
  }
  async avatarInfo(ctx, next) {
    // 1.用户头像是哪一个文件
    console.log('获取用户头像');
    const { userId } = ctx.params;
    const avatarInfo = await fileService.getAvatarByUserId(userId);
    // 2.提供图像信息
    ctx.response.set('content-type', avatarInfo.mimetype); //不设置浏览器不知道是什么资源，会默认下载
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
