// 路由
const fs = require('fs');
const useRoutes = function () {
  // 遍历router文件夹下的Router进行注册
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    this.use(router.routes());
    this.use(router.allowedMethods());
  });
};

module.exports = useRoutes;
