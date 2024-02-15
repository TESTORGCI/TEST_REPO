# WEBAPP #

This is a Node.js web application that supports basic authentication and database health checks.
 
## Prerequisites
 
Make sure the following requirements are installed on your development system before you start:
 
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- MySQL - [Download & Install MySQL](https://dev.mysql.com/downloads/mysql/), and make sure it's running on the default port (3306).
- A git client - [Download & Install Git](https://git-scm.com/downloads).
 
## Configuration
 
Before running the application, configure the `.env` file with your database credentials and port settings. `.env` template:
 
```plaintext
PORT = 8080
DB_PORT = 3306
WEBSERVER_HOSTNAME = localhost
DATABASE_HOSTNAME = localhost
DATABASE = 'DBNAME'
DATABASE_USER = 'DBUSER'
DATABASE_PASSWORD = 'YOUR PASSWORD'
DIALECT = mysql
```
 
## Building and Running Locally
 
1. **Clone the repository**
 
```bash
git clone <repository-url>
cd <project-directory>
```
 
2. **Install Dependencies**
 
From the project directory, install the required dependencies:
 
```bash
npm install
```
 
3. **Database Setup**
 
Ensure your MySQL service is running. The application will attempt to create the database if it doesn't exist when starting up.
 
4. **Start the Application**
 
```bash
node App.js
```
 
By default, the server will start on `http://localhost:8080`.
 
## Features
 

- User management: Create, Update, Get User
- Health check: A route to check the application health.
- Middleware for basic authentication
 
## API Endpoints
 
- `POST /v1/user`: Register a new user.
- `GET /v1/user/self`: Retrieve the current user's information (requires basic authentication).
- `PUT /v1/user/self`: Update the current user's information (requires basic authentication).
- `GET /healthz`: Health check route.