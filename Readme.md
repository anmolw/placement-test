# Placement portal skill test

## Features

- Authentication via passport.js
- Creating, deleting & updating students & interviews
- Assigning students to interviews & storing interview results
- Exporting stored results as a CSV file

## Installation & Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a .env file in the project's root directory, with the following format:

    ```
    DB_STRING=mongodb://127.0.0.1:27017/placement
    SESSION_SECRET=verysecretstring
    ```
    Alter the connection string to point to your desired mongoDB instance. Modify the session secret, ideally setting it to a random string.

4. Run `npm start`