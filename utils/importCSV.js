var fs = require('fs');
var csv = require('fast-csv');
const pool = require('./query');
const validator = require('../validator/validationChecks');
const _ = require('underscore');
const { type } = require('os');
let isValid = true;
let message = "";
let statusCode = 201; 

const csvFilePath = '.\\customerData\\customers.csv';
const headers = {
    USER_NAME: '',
    AGE: 1,
	HEIGHT: 1,
	GENDER: '',
    SALES_AMOUNT: 1,
	LAST_PURCHASE_DATE: 'yyyy-mm-ddThh:mm:ss'
};

_exports = {};

const loadCSV = (request, response) => {

let csvStream = csv.parseFile('.\\customerData\\customers.csv', {headers: true})
    .on("data", function(record){
            let username = record.USER_NAME;
            let age = record.AGE;
            let height = record.HEIGHT;
            let gender = record.GENDER;
            let salesAmount = record.SALES_AMOUNT;
            let lastPurchaseDate = record.LAST_PURCHASE_DATE;
       
            let values = validator.validate(username, age, height, gender, salesAmount, lastPurchaseDate)

            if (!values[0]) {
                statusCode = 400;
                throw(values[1]);
            }else {
                pool.query("INSERT INTO CUSTOMER (USER_NAME, AGE, HEIGHT, GENDER,SALES_AMOUNT, LAST_PURCHASE_DATE) \ Values($1, $2, $3, $4, $5, $6)",
                [username, age, height, gender, salesAmount, lastPurchaseDate], function(err){
                    if(err){
                        console.log("Failed to insert the csv data in the Database",err);
                    }
                });
                message = "CSV Data persisted to db successfully";
                statusCode = 200;
            }
    }).on("end", function(){
        console.log("Parsing done");
    }).on("error", function(err){
        console.log(err);
    });  
        response.status(statusCode).send(message);
}

module.exports = {
    loadCSV
}
