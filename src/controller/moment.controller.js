const momentService = require('../service/moment.service');
class MomentController {
  async create(ctx, next) {
    //1.获取数据(user_id,count)
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    // 2.将数据插入到数据库当中
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }

  async detail(ctx, next) {
    // 1.获取数据（momentId)
    const momentId = ctx.params.momentId;
    // 2.根据id取查询数据
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const { offset, size } = ctx.query;

    // 2.查询列表
    const result = await momentService.getMomentByList(offset, size);
    ctx.body = result;
  }

  async updateMoment(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    // 2.修改内容
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }
  async deleteMoment(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params;

    // 2.修改内容
    const result = await momentService.deleteMoment(momentId);
    ctx.body = result;
  }

  async addLabels(ctx, next) {
    // 1.获取标签和动态Id
    const { labels } = ctx;
    const { momentId } = ctx.params;
    console.log(123);
    //2.添加所有的标签
    // const result = await
    for (let label of labels) {
      console.log(label);
      // 判断是否已经存在该关系
      const isExists = await momentService.hasLabel(momentId, label.id);
      if (!isExists) {
        const result = await momentService.addLabels(momentId, label.id);
      }
    }
    ctx.body = '给动态添加标签成功~';
  }
}

module.exports = new MomentController();
