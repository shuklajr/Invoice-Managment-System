## ABSTRACT
The B2B world operates differently from B2C or C2C world. Businesses work with other businesses on credit. When a buyer business orders something from the seller business, the seller business issues an invoice for that order. This invoice contains various information like the details of the goods purchased and when they should be paid.


Seller business interacts with various businesses and sells goods to all of them at various times. Hence, the seller business needs to keep track of the total amount it owes from all of the buyers. This involves keeping track of all invoices from all buyers. The buyer business needs to clear its amount due before the due date.

The problem is to create an application for managing B2B order invoices. We have to build a Machine Learning Model to predict the payment date of an invoice when it gets created in the system and categorize into different buckets based on predicted payment date and this whole process should be managed by a UI developed using ReactJS. 


So, the project i.e. “AI-Enabled B2B Invoice Management Application” should help the Account Receivables team by collecting payments from customers for their past dues, sending reminders and follow-ups to customer for payments to be made, and help the company get paid for services and products supplied.

###Implementation

This section contains the implementation process for the project.


####4.1	Machine Learning Model 
In this project, we ask two questions about a new business invoice when giving instances of historical invoices and outcomes: " Would the invoice payment delay or not? " If it would delay, how long the delay would be? To answer these two questions, we will invoice payment delay, build a regression model that predicts the number of days by which it will get delayed, based on a training set of data containing instances whose outcome is known. We formulate the invoice outcome prediction task as a supervised learning problem: given instances of past invoices and their outcomes, build a model that can predict when a newly issued invoice will be paid, if no advanced actions are taken. And this model shall help us understand the characteristics of delayed invoices and problematic customers. In other words, it doesn't not only identify the payment delay but also evaluates the customers.



####4.1.1. DATASET USED

 ![image](https://user-images.githubusercontent.com/81213413/166680577-f4e07db5-207c-4be4-9659-cf9bce7ddea0.png)

			Fig. 4.1 DataSet used for ML Modelling


Columns of Dataset: 
1.	business_code 
2.	cust_number
3.	name_customer
4.	document_create_date
5.	document_craete_date.1
6.	posting_id
7.	due_in_date
8.	invoice_id
9.	baseline_create_date
10.	total_open_amount
11.	invoice_currency
12.	cust_payment_terms
13.	doc_id
14.	area_business
15.	business_year
16.	is_open

###4.1.2. DATA ANALYSIS AND MODELLING
The dataset consisted of 50,000 rows, from which 9,681 rows did not have the attribute ‘clear_date’. These observations (samples) are considered in the testing set. The other portion of the dataset is divided into training and two validation sets. All the date-related attributes are converted to DateTime format. The supervising attribute or the target variable is named ‘delay’, which interprets the number of days of invoice payment delay. It is calculated by subtracting the due_in_date from the clear_date in terms of days. The training set consisted of 39,158 observation data and the two validation sets have consisted of 7,832 observations each
![image](https://user-images.githubusercontent.com/81213413/166680731-881197b2-a40c-46a3-bc22-5998f9ee4367.png)
Fig 4.2. Modelling workflow and EDA on data

###4.1.3. RESULT OF DIFFERENT MODELS
        ![image](https://user-images.githubusercontent.com/81213413/166680840-f6b01882-6aab-48f3-be52-e3dc364b6c49.png)

###4.1.4. Result Analysis 
We select XGB Regressor as our final model to predict the delay and finally the clear_date of invoices as it has the least RMSE score and the highest R2_score.

###4.2. SQL + JAVA + ReactJS – Web Application Development

The application development part is related to building a web-based application that consists of a frontend dashboard displaying the data in a tabular form with different options like add, delete, edit and predict, connected to a backend database. We have created a beautiful user interface to add, edit, delete, print, and most importantly, predict order invoices with ReactJS. For this following steps are followed:

###4.2.1 LOADING THE DATA INTO DATABASE

The data is loaded using the SQLDUMP file into SQLyog.
![image](https://user-images.githubusercontent.com/81213413/166680912-3077bed8-4755-4583-b148-831d0d843cc1.png)

###4.2.2. CREATING API USING JAVA Servlet
	
The backend portion was done in Java. The first JDBC connection was established with SQL. Then servlets were created for every functionality.
•	Add servlet - POST request from the frontend is made with all the required parameters and are then passed to the SQL database to add a new invoice to the database
•	Edit servlet - POST request from the frontend with parameters to be edited and then passed to the SQL database to edit the invoice.
•	Delete Servlet - Delete the selected invoices from the database, by passing their respective sl_no to identify them in the database.
•	Search Servlet - Get the invoice number from the frontend and pass them as an HTTP request and search through the database and return it to the frontend again.
•	Data Display Servlet - Display the table of invoices to the frontend UI.
•	Advanced Search Servlet: GET request from the frontend is made with required parameters to perform an advanced search.
•	Analytics Servlet: Returns the data between date ranges received from the frontend to generate analytics graph.
•	Restore Servlet: Make a POST request to restore the deleted invoices from the database.
•	POJO Classes: Plain Old Java Objects for required parameters to be returned

![image](https://user-images.githubusercontent.com/81213413/166681002-561e3496-e154-41ee-b3e7-a43ef72d93b2.png)
Fig. 4.5 Eclipse and SQL Connection

###4.2.3. CREATING DASHBOARD Using REACTJS and MUI
	
A dashboard was made in ReactJs. The main page had a Head Section, comprised of the company logo and account name logo, and then the Grid Section, comprised of a panel having Add, Delete, Edit, Refresh, Analytics, Advanced Search, Predict, Recently Deleted and search button. The Predicted Payment Date will remain blank and selecting one row and then clicking on predict will get the payment date populated. Whenever multiple rows are selected the add button will remain activated and the user can type in the value he/she wants to insert. Also, the user has to fill all the required fields otherwise insertion won’t happen. Clicking on the edit button permits the user to edit all the editable columns, but only when one row is selected. With the help of the delete button, the user can delete one pre-existing data. The deleted rows then go to recently deleted section and then can be restored if desired. The search button helps to look for particular data. The Advanced Search button helps to get a row based on any or all the values specified. Analytics Button will give a graph between date ranges and of the invoice currency specified by the user. Refresh Button will refresh the data in the data grid.  All these functionalities were carried out by using material-UI and establishing a connection with the backend.

![image](https://user-images.githubusercontent.com/81213413/166681117-c7283c77-a916-4100-8bb5-06cc59a81bd7.png)
Fig. 4.6. Website UI and Walkthrough




