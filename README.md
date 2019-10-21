# Split The Bill Backend

[Visit Backend](https://build-split-the-bill.herokuapp.com) (see endpoints below)

Split the bill is a fullstack web application that has been built during the WEB20 buildweek_3 (29.07.2019-02.08.2019) by [LambdaSchool](https://lambdaschool.com/) students. Each student fulfills a role in the project to collectively build the app. (Roles listed below)

Split The Bill provides a web application where people can easily calculate how much they have to pay. It splits a certain bill divided by the amount of people and gives them an overview how much they owe. A use case would be for example at a night out in a bar. As the fun and also alcohol level rises calculating the bill becomes more difficult and an app takes the tedious task away.

## Built With

- [JavaScript](https://en.wikipedia.org/wiki/JavaScript) - Language used to make the webpage interactive
- [Node.js](https://en.wikipedia.org/wiki/JavaScript) - JavaScript runtime for executing JavaScript at the server outside the browser
- [Express.js](https://expressjs.com/) - Lightweight web framework to bootstrap Node.js APIs
- [SQLite](https://www.sqlite.org/index.html) - Super lightweight database to bootstrap development environments
- [PostgreSQL](https://www.postgresql.org/) - An advanced object-relational database for production environments
- [Knex.js](https://knexjs.org/) - A SQL query builder that helps abstracting migrations and DDLs for different database types into a single coherent structure

- [JWT](https://jwt.io/) - JSON Web Token for authorization and client side tokens for security
- [Moment.js](https://momentjs.com/) - Lightweight Module to handle dates and times
- [Supertest](https://www.npmjs.com/package/supertest) - A test module for HTTP assertions
- [JEST](https://jestjs.io/) - Simple JavaScript testing framework

# Endpoints

:x: = `Not Required`  
:heavy_check_mark: = `Required`

## **General**

### **GET [API RUNNING]**

```
https://split-the-bill-postgres.herokuapp.com/
```

- JWT protected (header) :x:
- payload (body) :x:

API Running Response (200 OK):

```
Welcome to the production environment API of Split The Bill!
```

## USERS

### **POST [REGISTER AN USER]**

```
https://build-split-the-bill.herokuapp.com/api/users/register
```

- JWT protected (header) :x:
- payload (body) :heavy_check_mark:

Example Request:

```
{
	"email": "kevin@test.com",
	"password": "correcthorsebatterystaple",
	"firstname": "kevin",
	"lastname": "tou"
}
```

Created user Response (201 CREATED):

```
{
    "id": 15,
    "email": "kevin@test.com",
    "firstname": "kevin",
    "lastname": "tou"
}
```

User data not complete Response (400 BAD REQUEST):

```
{
 "warning": "Not all information were provided to create a new user."
}
```

Server Error Response (500 SERVER ERROR):

```
{
"error": "An error occurred during the creation of a new user."
}
```

### **POST [LOGIN AN USER]**

```

https://build-split-the-bill.herokuapp.com/api/users/login

```

- JWT protected (header) :x:
- payload (body) :heavy_check_mark:

Example Request:

```

{
    "email": "kevin@test.com",
	"password": "correcthorsebatterystaple"
}

```

Logged In Response (200 OK):

```
{
    "message": "The user kevin@test.com successfully logged in!",
    "user": {
        "id": 11,
        "email": "kevin@test.com",
        "firstname": "kevin",
        "lastname": "tou"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMSwiZW1haWwiOiJrZXZpbkB0ZXN0LmNvbTY2NiIsImlhdCI6MTU2NDY4MTc1MCwiZXhwIjoxNTY0Njg1MzUwfQ.-DGabIPf9dXG38gx3t5Jq3xXwHzWLUwv1Zum0G_nkeE"
}
```

Invalid credentials Response (401 UNAUTHORIZED):

```
{
    "warning": "Invalid credentials submitted for the login of an user."
}
```

Server Error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred during logging in an user."
}
```

### **GET [ALL USERS]**

```
https://build-split-the-bill.herokuapp.com/api/users
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below
- No passwords are returned they are not even stored in the database directly

Found users Response (200 OK):

```
{
    "users": [
        {
            "id": 1,
            "email": "sascha.majewsky@pm.me",
            "firstname": "sascha",
            "lastname": "majewsky"
        },
        {
            "id": 2,
            "email": "hanne.xxx@pm.me",
            "firstname": "hanne",
            "lastname": "xxx"
        }
    ]
}
```

Server error Response (500 SERVER ERROR):

```
{
    error: "An error occurred during fetching all users. That one is on us!"
}
```

### **GET [AN USER BY ID]**

```
https://build-split-the-bill.herokuapp.com/api/users/{ID}
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- ID is defined over the used route at the end
- Authorization gets validated over restricted middleware - extra responses below
- USER ID gets validated over validateUserId middleware - extra responses below
- No passwords are returned they are not even stored in the database directly

Found user Response (200 OK):

```
{
    "id": 1,
    "email": "sascha.majewsky@pm.me",
    "firstname": "sascha",
    "lastname": "majewsky"
}
```

Server error Response (500 SERVER ERROR):

```
{
    error: "An error occurred during fetching an user with the id 1."
}
```

### **PUT [UPDATE AN USER]**

```

https://build-split-the-bill.herokuapp.com/api/users/{ID}

```

- JWT protected (header) :heavy_check_mark:
- payload (body) :heavy_check_mark:
- Authorization gets validated over restricted middleware - extra responses below
- USER ID gets validated over validateUserId middleware - extra responses below
- USER gets validated over validateUser middleware - extra responses below

Example Request:

```
{
	"email": "changeduser@test.com",
	"firstname": "garry",
	"lastname": "squarepants"
}
```

Updated user Response (200 OK):

```
{
    "message": "The user with the id 1 has been successfully updated!"
}
```

Database error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred within the database thus the user with the id 1 could not be updated."
}
```

Server error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred during updating the user with the id 1."
}
```

### **GET [BILLS OF AN USER BY ID]**

```
https://build-split-the-bill.herokuapp.com/api/users/{ID}/bills
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below
- USER ID gets validated over validateUserId middleware - extra responses below
- ID is defined over the used route at the end

Found bills Response (200 OK):

```
{
    [
        {
            "id": 1,
            "split_sum": 15.73,
            "split_people_count": 3,
            "created_at": "July 31st 2019, 11:39:09 pm",
            "user_id": 1,
            "user_email": "sascha.majewsky@pm.me"
        },
        {
            "id": 30,
            "split_sum": 15.5662,
            "split_people_count": 3,
            "created_at": "August 1st 2019, 12:41:14 pm",
            "user_id": 1,
            "user_email": "sascha.majewsky@pm.me"
        },
    ]
}
```

No bills found for the user Response (404 NOT FOUND):

```
{
    "info": "No bills are available for the user with the id 3."
}
```

Server error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred retrieving the bills for the user with the id 3."
}
```

## **BILLS**

### **GET [ALL BILLS]**

```
https://build-split-the-bill.herokuapp.com/api/bills
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below

Found bills Response (200 OK):

```
{
    "bills": [
        {
            "id": 1,
            "split_sum": 15.73,
            "split_people_count": 3,
            "created_at": "July 31st 2019, 11:39:09 pm",
            "user_id": 1
        },
        {
            "id": 2,
            "split_sum": 33.35,
            "split_people_count": 2,
            "created_at": "July 31st 2019, 11:39:09 pm",
            "user_id": 2
        }
    ]
}
```

Server error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred during fetching all bills. That one is on us!"
}
```

### **GET [A BILL BY ID]**

```
https://build-split-the-bill.herokuapp.com/api/bills/{ID}
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- ID is defined over the used route at the end
- Authorization gets validated over restricted middleware - extra responses below
- BILL ID gets validated over validateBillId middleware - extra responses below

Found bill Response (200 OK):

```
{
    "id": 2,
    "split_sum": 33.35,
    "split_people_count": 2,
    "created_at": "July 31st 2019, 11:39:09 pm",
    "user_id": 2
}
```

Server error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred during fetching a bill with the id 2."
}
```

### **POST [A NEW BILL]**

```
https://build-split-the-bill.herokuapp.com/api/bills/
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :heavy_check_mark:
- Authorization gets validated over restricted middleware - extra responses below
- BILL gets validated over validateBill middleware - extra responses below

Example Request:

```
{
	"user_id": 1,
	"split_sum": 15.56618455214584,
	"split_people_count": 3
}
```

New bill Response (200 OK):

```
{
    "id": 51,
    "user_id": 1,
    "split_sum": 15.5662,
    "split_people_count": 3,
    "created_at": "August 1st 2019, 6:19:19 pm"
}
```

Bill info not complete Response (400 BAD REQUEST):

```
{
    "warning": "Not all information were provided to create a new bill."
}
```

Server error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred during the creation of a new bill."
}
```

### **DELETE [A BILL]**

```
https://build-split-the-bill.herokuapp.com/api/bills/{ID}

```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below
- BILL ID gets validated over validateBillId middleware - extra responses below

Bill deletion Response (200 OK):

```
{
    "message": "The bill with the id of 2 was successfully deleted."
}
```

Server error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred during deletion of a bill with the id 1."
}
```

### **PUT [UPDATE A BILL]**

```
https://build-split-the-bill.herokuapp.com/api/bills/{ID}

```

- JWT protected (header) :heavy_check_mark:
- payload (body) :heavy_check_mark:
- BILL gets validated over validateBill middleware - extra responses below
- Authorization gets validated over restricted middleware - extra responses below
- BILL ID gets validated over validateBillId middleware - extra responses below

Example Request:

```
{
	"split_sum": 400.22,
    "split_people_count": 2,
	"user_id": 1
}
```

Updated bill Response (200 OK):

```
{
    "message": "The bill with the id 2 has been successfully updated!"
}
```

Database error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred within the database thus the bill with the id 1 could not be updated."
}
```

Server error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred during updating the bill with the id 1."
}
```

### **GET [NOTIFICATIONS OF A BILL BY ID]**

```
https://build-split-the-bill.herokuapp.com/api/bills/{ID}/notifications
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- ID is defined over the used route at the end
- Authorization gets validated over restricted middleware - extra responses below
- BILL ID gets validated over validateBillId middleware - extra responses below

Found notifications for bill Response (200 OK):

```
[
    {
        "id": 1,
        "email": "sascha@test.com",
        "bill_id": 1
    },
    {
        "id": 3,
        "email": "anotherfriend@test.com",
        "bill_id": 1
    }
]
```

No notifications found Response (404 NOT FOUND):

```
{
    "info": "No bills available for the user with the id 2."
}
```

Server error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred during retrieving the bills for the user with the id 1."
}
```

### **DELETE [ALL NOTIFICATIONS OF A BILL]**

```
https://build-split-the-bill.herokuapp.com/api/bills/{ID}/notifications

```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below
- BILL ID gets validated over validateBillId middleware - extra responses below

Deletion notifications Response (200 OK):

```
{
    "message": "The notification(s) for the bill with the id of 52 were successfully deleted."
}
```

No notifications to delete found Response (404 NOT FOUND):

```
{
    "info": "The bill of the id 52 does not contain any notifications."
}
```

Database error deletion of a notification Response (500 SERVER ERROR):

```
{
    "error": "An error occurred during retrieving the bills for the user with the id 52."
}
```

Server error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred during the deletion for notifications for the bill with the id 52."
}
```

## **NOTIFICATIONS**

### **GET [ALL NOTIFICATIONS]**

```
https://build-split-the-bill.herokuapp.com/api/notifications
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below

Notifications found Response (200 OK):

```
{
    "notifications": [
        {
            "id": 1,
            "email": "sascha@test.com",
            "bill_id": 1
        },
        {
            "id": 3,
            "email": "anotherfriend@test.com",
            "bill_id": 1
        }
    ]
}
```

Server error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred during fetching all notifications. That one is on us!"
}
```

### **POST [AN ARRAY OF NOTIFICATIONS]**

```
https://build-split-the-bill.herokuapp.com/api/notifications
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :heavy_check_mark:
- BILL gets validated over validateBill middleware - extra responses below

Example Request:

```
{
	"bill_id": 52,
	"email": ["friend_one@test.com", "friend_two@test.com", "friend_three@test.com"]
}
```

Created notifications Response (200 OK):

```
{
    "message": "The notification(s) have been successfully persisted."
}
```

Notification info not complete Response (400 BAD REQUEST):

```
{
    "warning": "Not all information were provided to create a new notification."
}
```

Server error Response (500 SERVER ERROR):

```
{
    "error": "An error occurred during creating a new notification."
}
```

#### Middleware

Middleware is divided into 2 different types:

- Middleware that restricts access to certain routes for authorization
- Middleware that validates requests payloads.

Whenever for a route a certain ID or Resource object like a user is required these routes are protected by validation middleware and returning generic responses when used by badly shaped requests. Thus every endpoint documented has a indication of what generic validation responses it will provide when used incorrectly.

Authorization is handled through Java Web Token (JWT). A token authorizes a user to access JWT protected routes for 1 hour until it a relogin needs to happen.

To submit a JWT along a HTTP request add the JWT that can be acquired through the unprotected login route and then set it as "Authorization" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMSwiZW1haWwiOiJrZXZpbkB0ZXN0LmNvbTY2NiIsImlhdCI6MTU2NDY4MzgzMiwiZXhwIjoxNTY0Njg3NDMyfQ.t3LhcZ5VppqZMSPL4LAWcllEqKzI9nTZ8VNseMZzoVE" as a Header for the request.

The JWT is randomly generated and only the specific provided one from login will be valid.

Bad Authorization Response (401 UNAUTHORIZED):

```
{
    "warning": "Authorization failed. Access denied!"
}
```

User validation no body data (400 BAD REQUEST):

```
{
    "warning": "Missing user data entirely."
}
```

User validation user data not complete (400 BAD REQUEST):

```
{
    "warning": "Missing required email or firstname or lastname information for an user."
}
```

User ID validation user not found (404 NOT FOUND):

```
{
    "info": "The user with the id 3 was not found during validation."
}
```

User ID validation server error (500 SERVER ERROR):

```
{
    "error": "An error occurred during validation of the user."
}
```

Bill validation no body data (400 BAD REQUEST):

```
{
    "warning": "Missing bill data entirely."
}
```

Bill validation bill data not complete (400 BAD REQUEST):

```
{
    "warning": "Missing required split_sum or split_people_count or user_id information for a bill."
}
```

Bill ID validation bill not found (404 NOT FOUND):

```
{
    "info": "The bill with the id 3 was not found during validation."
}
```

Bill ID validation server error (500 SERVER ERROR):

```
{
    "error": "An error occurred during validating of a bill."
}
```

Notification validation no body data (400 BAD REQUEST):

```
{
    "warning": "Missing notification data entirely."
}
```

Notification validation notification data not complete (400 BAD REQUEST):

```
{
    "warning": "Missing required email or bill_id information for a notification."
}
```

Notification ID validation notification not found (404 NOT FOUND):

```
{
    "info": "The notification with the id 3 was not found during validation."
}
```

Notification ID validation server error (500 SERVER ERROR):

```
{
    "error": "An error occurred during validation of a notification."
}
```

#### JSON Responses

For JSON responses there are 4 different content types available:

- A JSON containing a **{ "id": 1, "email": "test@test.com" }** or **{ "resource": [{"id": 1, "email": "test@test.com"}, {"id": 2, "email": "test2@test.com"}] }** or **{ "message": "text" }** means that the request was successful and data is returned to the client. So the request **happened**.
- A JSON containing a { "**info**" : "text" } means that the request was semantically not useful as for example a deletion of no elements. It **happened** but was useless.
- A JSON containing a { "**warning**": "text"} means that something went wrong because of how the request was shaped and it **did not happen**.
- A JSON containing a { "**error**" : "text" } means that something went wrong internally during the request and it **did not happen**.

## Architecture and Workflow

![](documentation/db-schema.png)

The application is split into three tables. One User can have many bills. One bill can have many notifications. By this a single bill can have a dynamic amount of friends that don't have to be users of the platform and still get notified by email about their invoice/what their part of the total sum was.

For the backend node.js with express.js was used to bootstrap the endpoints. For the database in development environment SQLITE3 was used and for the production in deployment postgres was used. For authorization and restriction of endpoints JWT between the frontend client and the backend was used. The deployment was made on Heroku where the environmental variables are configured and tweaks via heroku cli were made.
For testing of the server and endpoints supertest and JEST was used.

## Project Requirements and Documentation

- [Initial Project Description](https://airtable.com/shrDIdKTqxyHdZCrI/tblZdTNOY7ULU4UKz/viwLWVBRd1bS3thaa/reclsZJL05TtAdeuS?blocks=hide)

- Backend Model and Planning - Directory "documentation"

- [Technical Design Documentation](https://docs.google.com/document/d/14K4ZoCNov8Ba9x4Sl4H4AEkDlMSDUstCXs51d_7OFUE/edit)

- [Grading/Rubric - Backend Node Students](https://www.notion.so/04382aff1e09483dac0e29446ec4ef6f?v=3c1f346ae7b04962919385e74176d883)

- [Requirements and Milestones](https://www.notion.so/6e719d512134435f8a89ca2862f8d3e7?v=6c8d3bd7bbcb44539f8659fc96caa906)

## Authors

**Role: Backend Developer**

- **[Sascha Majewsky](https://github.com/SaschaWebDev)**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
