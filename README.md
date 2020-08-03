# FashionMart
Node Js Implementation to manage customer data in csv format to update in database


Install nodejs and Postgres sql

connect to the db and update the credentials for database in the credentials.js

Exposed APIs
1) To load CSV Data 
POST http://localhost:80/sales/record

2) To get all data 
http://localhost:80/sales/report

3) To get only for matching the last purchase date 
http://localhost:80/sales/report/2018-07-31T04:16:38.000Z

4)  To get only for matching the last purchase date range from start date to end date
http://localhost:80/sales/report/?startDate=2018-07-31T04:16:38.000Z&endDate=2019-07-31T04:16:38.000Z

Sample csv file can be refer in the location \customerData\customers.csv
