class UserService {
  async create(user) {
    console.log('将用户数据保存到数据库中', user)
    // 将user存储到数据库中
    return '创建用户成功~'
  }
}

module.exports = new UserService()
