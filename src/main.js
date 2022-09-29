const app = require('./app')
require('./app/databse')

const config = require('./app/config')

app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}启动成功!`)
})
