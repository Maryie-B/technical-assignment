# Technical Assignment

This is a technical assignment for a small web application that allows users to search for movies using TheMovieDB API. Users can dynamically search for movies by title, view detailed information about each movie, add movies to a favorites list, and authenticate through a login system.

## Environment Setup:

### Tech Stack:

The application is a full-stack app, with the following technologies:
- **Frontend:** Vite-React, Fontawesome icons, React Router 6, Sass
- **Backend:** Express.js, MongoDB, Bcrypt.js, Body-parser, Jsonwebtoken, nodemon, Concurrently, Mongoose

### Prerequisites:
- **Node.js**: Ensure that Node.js (version 14 or higher) is installed.
  [Download Node.js](https://nodejs.org/en/download)
- **MongoDB**: Ensure that MongoDB is installed and set up.
  [Download MongoDB](https://www.mongodb.com/try/download/community)

MongoDB installation includes MongoDB Compass, which facilitates collection creation and database administration locally.

MongoDB will install the MongoDB Compass, which allows for collection creation and database administration locally. 

### Project setup:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Maryie-B/technical-assignment.git
2. Navigate to the Project Directory:
   ```bash
   cd technical-assignment
3. Install Backend Dependencies:
   From the root directory, run:
   ```bash
   npm install
4. Install Frontend Dependencies:
   Navigate to the 'frontend' directory and run:
   ``` bash
   cd frontend
   npm install
   cd ..
5. Set Up Environment Variables:
   Frontend: In the 'frontend' directory, create a .env file. Fill in the VITE_APP_API_ACCESS_TOKEN with your TheMovieDB access token as outlined in .env.example.
7. Setup MongoDB Database:
   Open MongoDB Compass and connect to 'localhost:27017/test', creating a new database named 'test' and the necessary collections. JSON data can be added to the 'test' database using Compass. 
8. Start the Application:
  From the root directory, run:
    ```bash
   npm start
  This command uses Concurrently to run both backend and frontend servers simultaneously.
9. Verify Installation:
 - Frontend Server: Should be running at http://localhost:5173/
 - Backend Server: Should be listening on port 5000

### Common Issues and Troubleshooting:
If MongoDB Compass does not connect, ensure MongoDB service is running and listening on the correct port.
If the application does not start, check that all dependencies are installed and environment variables are set correctly.

## Application features:

1. Sign-up and/or Login to access the movie list
2. Discover movies on the home page or search for a specific title
3. See movie details by clicking the movie thumbnail
4. From the detailed view, add the movie to your favourite list or navigate back to home
5. View and manage favourite list be deleting movies
6. Navigate back home by clicking the logo
7. Log off
