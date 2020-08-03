
const pool = require('./utils/query');
const csv = require('./utils/importCSV');


pool.connect(function(err){
    if(err){
        console.log(err);
    }
});
    
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
const port = 80
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/sales/report/:lastPurchaseDate', pool.getCustomersByDate);
app.get('/sales/report', function(req, res) {
    if(req.query.startDate == null && req.query.endDate == null){
        pool.getCustomers(req,res);
    }
    else{ 
        if (_.isDate(new Date(req.query.startDate)) && _.isDate(new Date(req.query.startDate))) {
            pool.getCustomersByDateRange(req.query.startDate,req.query.endDate, res)
        }
        else{
            throw("Invalid start/end date")
        }
    }
});
app.post('/sales/record', csv.loadCSV);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

 