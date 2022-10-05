const connection = require('../app/databse');
class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO users (name,password) VALUES (?,?);`;

    const result = await connection.execute(statement, [name, password]);
    console.log('将用户数据保存到数据库中', user);
    // 将user存储到数据库中
    return result[0];
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`;
    try {
      const [result] = await connection.execute(statement, [avatarUrl, userId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserService();
