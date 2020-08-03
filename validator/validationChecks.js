const config = require('../config/config');
const _ = require('underscore');

let message = "";
exports.validate = function checkValidation(username,age,height,gender,salesAmount,lastPurchaseDate){
    let validationRules = config.validationRules;
    validationRules.forEach(function(validationRule) {

    if (validationRule.type == 'NUMBER') {
        if(_.isNaN(age) && _.isEmpty(age)){
            message = "Age is empty or undefined";
            return [false,message]; 
        }  
        if(!typeof parseInt(age) == "number") {
            message = "Age :" + age +" is not a valid number";
            return [false,message];
        }
        if(validationRule.saveAs == "AGE" && validationRule.size < age.length) {
            message = "Age :" + age +" exceeds its length limit";
            return [false,message];
        }
        if(_.isNaN(height) && _.isEmpty(height)){
            message = "Height is empty or undefined";
            return [false,message];
        }
        if(!typeof parseInt(height) == "number") {
            message = "Height :" + height +" is not a valid number";
            return [false,message];
        }
        if(validationRule.saveAs == "HEIGHT" && validationRule.size < height.length){
            message = "Height :" + height +" exceeds its length limit";
            return [false,message];
        }

        if(_.isNaN(salesAmount) && _.isEmpty(salesAmount)) {
            message = "Sales amount is empty or undefined";
            return [false,message];
        }
        if(!typeof parseInt(salesAmount) == "number") { 
            message = "Sales Amount :" + salesAmount +" is not a valid number";
            return [false,message];
        }
        if(validationRule.saveAs == "SALES_AMOUNT" && validationRule.size <= salesAmount.length){
            message = "Sales Amount :" + salesAmount +" exceeds its length limit";
            return [false,message];
        }
    } else if (_.isUndefined(validationRule.type) && _.isEmpty(validationRule.type) && validationRule.type == 'STRING') {
        let size = validationRule.size;

        if (!_.isUndefined(size) && !_.isEmpty(size)) {
            if (username.length >= +size && validationRule.saveAs == "USER_NAME") {
                message = "Length of Username :" + username + " exceeds its limit"+ size;
                return [false,message];
            }
            if (_.isEmpty(username)) {
                message = "UserName should not be empty "+ size;
                return [false,message];
            }
            if (gender.length >= +size && validationRule.saveAs == "GENDER") {
                message = "Length of Gender :" + gender + " exceeds its limit"+ size;
                return [false,message];
            }
            if (_.isEmpty(gender)) {
                message = "Gender should not be empty "+ size; 
                return [false,message];
            }
        }
    }else if (validationRule.type == 'DATE'){
        if (!_.isUndefined(lastPurchaseDate) && !_.isEmpty(lastPurchaseDate)) {
            lastPurchaseDate = new Date(lastPurchaseDate);

            if(!_.isDate(lastPurchaseDate)) {
                message = "Last Purchasing Date " + lastPurchaseDate + "is not a valid Date";
                return [false,message];
            }
        }
    }
});
  //  console.log(false)
    return [false,message];
}