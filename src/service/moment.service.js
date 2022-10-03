const connection = require('../app/databse');

const sqlFragment = ` 
SELECT 
m.id id,m.content content,m.createAt createTime, m.updateAt updateTime,
JSON_OBJECT('id',u.id,'name',u.name) author
FROM moment m
LEFT JOIN users u ON m.user_id = u.id`;
class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (content,user_id)  VALUES (?,?);`;
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }
  async getMomentById(id) {
    const statement = `
    ${sqlFragment}
    WHERE m.id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    console.log(result);
    return result[0];
  }

  async getMomentByList(offset, size) {
    const statement = `
    ${sqlFragment}
    LIMIT ?,?;
    `;
    const [result] = connection.execute(statement, [offset, size]);
    console.log(result);
    return result;
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }
  async deleteMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new MomentService();
