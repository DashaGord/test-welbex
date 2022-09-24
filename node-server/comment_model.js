const Pool = require('pg').Pool
const PAGE_SIZE = 20;

const pool = new Pool({
  user: 'root',
  host: 'db',
  database: 'my_db',
  password: 'root',
  port: 5432,
});

const getComments = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT COUNT(*) FROM comment', (error1, results1) => {
      if (error1) {
        return resolve({"count": 0, "value": []});
      }
      let count = Math.ceil(results1.rows[0].count / PAGE_SIZE);

      pool.query(`SELECT * FROM comment ORDER BY id ASC LIMIT ${PAGE_SIZE}`, (error2, results2) => {
        if (error2) {
          return resolve({"count": 0, "value": []});
        }
        resolve({"count": count, "value": results2.rows});
      })
    })
  })
}

const getCommentsPaginate = (params) => {
  let page = params[0][1];
  let offset = PAGE_SIZE * page;

  return new Promise(function(resolve, reject) {
    pool.query('SELECT COUNT(*) FROM comment', (error1, results1) => {
      if (error1) {
        return resolve({"count": 0, "value": []});
      }
      let count = Math.ceil(results1.rows[0].count / PAGE_SIZE);

      pool.query(`SELECT * FROM comment ORDER BY id ASC OFFSET ${offset} ROWS FETCH NEXT ${PAGE_SIZE} ROWS ONLY`, (error2, results2) => {
        if (error2) {
          return resolve({"count": 0, "value": []});
        }
        resolve({"count": count, "value": results2.rows});
      })
    })
  })
}

const getCommentsWithParams = (params) => {
  let columnName = params[0][1];
  let condition = params[1][1];
  let value = params[2][1];
  let page = params[3][1];
  let offset = PAGE_SIZE * page;

  if (condition === 'like') {
    value = "'%" + value + "%'";
  }

  return new Promise(function(resolve, reject) {
    pool.query(`SELECT COUNT(*) FROM comment WHERE ${columnName} ${condition} ${value}`, (error1, results1) => {
      if (error1) {
        return resolve({"count": 0, "value": []});
      }
      let count = Math.ceil(results1.rows[0].count / PAGE_SIZE);

      pool.query(`SELECT * FROM comment WHERE ${columnName} ${condition} ${value} ORDER BY id ASC OFFSET ${offset} ROWS FETCH NEXT ${PAGE_SIZE} ROWS ONLY `, (error2, results2) => {
        if (error2) {
          return resolve({"count": 0, "value": []});
        }
        resolve({"count": count, "value": results2.rows});
      })
    })
  })
}

module.exports = {
  getComments,
  getCommentsPaginate,
  getCommentsWithParams
}