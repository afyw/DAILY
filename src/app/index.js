const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const useRoutes = require('../router');
const errorHandle = require('./error-handle');

const app = new Koa();
app.use(bodyParser());
app.useRoutes = useRoutes;
app.useRoutes(); //this隐式绑定

// 监听错误信息
app.on('error', errorHandle);

module.exports = app;
