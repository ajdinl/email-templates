# Email Templates Rest API

## Description

This is a REST API for the Email Templates Application. It is built with Node.js, Express, and MongoDB, for the backend, and NextJS (React), for the frontend.

## Download and Installation

Clone the repository:
Open your terminal or command prompt and run the following command to clone the repository:

git@github.com:ajdinl/email-templates.git

This will create a local copy of the repository on your machine.

Create environment files:
Navigate to the project's server and client directory and locate the env-example files. You will need to create new environment files (.env) based on these examples. These files usually store sensitive information and configurations that the application needs to run.

Register on MongoDB website:
Visit the MongoDB website (https://www.mongodb.com/) and create an account if you don't have one. After registering, follow the steps to create a new MongoDB database or use an existing one for the application.

Update the .env file:
Open the .env file in the server folder with a text editor and update the following variables with your MongoDB credentials:

MONGODB_URI= your mongodb uri
JWT_SECRET = your jwt secret
Replace your mongodb uri with the connection URI to your MongoDB database. You can find this information on the MongoDB website. Replace your jwt secret with a secret of your choice. This is used to sign the JWT tokens.

Install dependencies:
In your terminal or command prompt, navigate to the project's root directory (where the package.json is located) and run the following command to install the dependencies for both the client and server:

npm install
Run this command in root directory.
This will install all the required packages specified in the package.json files for both the client and server.

Start the application:
After the installation is complete, run the following command to start the application:

npm start
This will start both the client and server applications concurrently.

Access the application:
Once the application is running, open your web browser and visit the following URL:

http://localhost:3000/
You should now see the "The Email Templates Application" running locally on your machine.

Please note that these instructions assume you have Node.js, NPM, and Git installed on your system. If you don't have them installed, make sure to install them before proceeding with the instructions.
