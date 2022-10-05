const fileService = require('../service/file.service');
const userService = require('../service/user.service');
const { AVATAR_PATH } = require('../constants/file-path');

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像相关信息
    const { mimetype, filename, size } = ctx.req.file;
    const { id } = ctx.user;

    // 2.将图像信息数据保存到数据库
    const result = await fileService.createAvatar(filename, mimetype, size, id);
    // 3.将图片地址保存到users表中
    const avatarUrl = `${AVATAR_PATH}/${filename}`;
    console.log(avatarUrl, id);
    await userService.updateAvatarUrlById(avatarUrl, id);
    // 4.返回结果
    ctx.body = {
      statusCode: 200,
      message: '上传头像成功~'
    };

    console.log(ctx.req.file);
  }
}

module.exports = new FileController();
