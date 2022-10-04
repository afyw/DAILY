const connection = require('../app/databse');

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (content,user_id)  VALUES (?,?);`;
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }
  async getMomentById(id) {
    const statement = `
    SELECT 
    m.id id,m.content content,m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name) author
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    WHERE m.id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    console.log(result);
    return result[0];
  }

  async getMomentByList(offset, size) {
    const statement = `
    SELECT 
    m.id id,m.content content,m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name) author,
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LIMIT ?,?;
    `;
    const [result] = await connection.execute(statement, [offset, size]);
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
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result[0] ? true : false;
  }

  async addLabels(momentId, labelId) {
    console.log('进行插入操作！');
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  } 
}

module.exports = new MomentService();
