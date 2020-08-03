const Pool = require('pg').Pool
const credentials = require('../config/credentials');

const pool = new Pool({
  user: credentials.user,
  host: credentials.server,
  database: credentials.database,
  password: credentials.password,
  port: 5432,
})

pool.on('error', function(err, client) {
  console.error('idle client error', err.message, err.stack);
});

const getCustomers = (request, response) => {
    pool.query('SELECT * FROM customer ORDER BY user_name ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getCustomersByDate = (request, response) => {
  const lastPurchaseDate = new Date(request.params.lastPurchaseDate);
  pool.query('SELECT * FROM customer WHERE LAST_PURCHASE_DATE = $1', [lastPurchaseDate], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCustomersByDateRange = (startDateString,endDateString, response) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  pool.query('SELECT * FROM Customer WHERE last_purchase_date >= $1 and last_purchase_date <= $2', [startDate, endDate], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getCustomers: getCustomers,
  getCustomersByDate:   getCustomersByDate,
  getCustomersByDateRange: getCustomersByDateRange
}

module.exports.pool = pool;

module.exports.query = function(text, values, callback){
  console.log('query:', text, values)
  return pool.query(text,values,callback);
}

module.exports.connect = function(callback){
  return pool.connect(callback);
};