const service = require('../service/label.service');
// 处理表中不存在的标签
const verfyLabelExists = async (ctx, next) => {
  // 1.取出要添加的所有的标签
  const { labels } = ctx.request.body;
  // 2.判断标签是否在label表中存在
  const newLabels = [];
  for (let name of labels) {
    const labelResult = await service.getLabelByName(name);
    const label = { name };
    if (!labelResult) {
      // 创建标签数据
      const result = await service.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }

    newLabels.push(label);
  }
  ctx.labels = newLabels;
  await next();
};

module.exports = {
  verfyLabelExists
};
