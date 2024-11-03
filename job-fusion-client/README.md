# Job Fusion
Job Fusion is a full-stack job and project platform built with the MERN stack, where users can find jobs or projects, post opportunities, and bid on available listings. The platform offers a streamlined experience for job seekers, freelancers, and employers to connect and manage their work or hiring processes.

## Table of Contents
Features
Technologies Used
Installation
Usage
Folder Structure
Contributing
License
## Features
User Registration & Authentication: Secure login and registration using Firebase.
Job & Project Posting: Users can post jobs or projects with detailed descriptions.
Bidding System: Users can place bids on projects or job listings.
User Profiles: Users can view their profile, posted items, bids, and bid requests.
Data Security: Data is protected using JWT authentication.
Real-Time Data Fetching: React Query and Axios are used for efficient data fetching and caching.
Responsive Design: User-friendly and accessible on various device sizes.
## Technologies Used
### Frontend
React JS: For building a dynamic user interface.
React Router: For managing routes in a single-page application.
React Query: To handle data fetching and caching.
Axios: For HTTP requests to the server.
Firebase: For authentication and user management.
### Backend
Node.js: Server-side JavaScript runtime.
Express.js: For handling backend API routes.
MongoDB: NoSQL database hosted on MongoDB Atlas.
JWT (JSON Web Tokens): For secure user authentication and authorization.
Deployment
Client: Deployed on Firebase.
Server: Deployed on Vercel.
## Installation
Prerequisites
Make sure you have the following installed on your machine:

Node.js
MongoDB (if running locally) or set up a MongoDB Atlas cluster
Firebase project setup for authentication
Steps
Clone the Repository

bash
Copy code
git clone https://github.com/yourusername/job-fusion.git
cd job-fusion
Install Dependencies

Install server dependencies:
bash
Copy code
cd server
npm install
Install client dependencies:
bash
Copy code
cd ../client
npm install
Environment Variables

Create .env files in both client and server folders.
For the server:
plaintext
Copy code
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
For the client:
plaintext
Copy code
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
Run the Application

Start the server:
bash
Copy code
cd ../server
npm start
Start the client:
bash
Copy code
cd ../client
npm start
## Usage
Once the application is up and running:

Register/Login using Firebase authentication.
Explore Job Listings: Browse available jobs or projects.
Post a Job/Project if you’re an employer or project owner.
Place Bids on jobs or projects that interest you.
Manage Profile: View bids, posted items, and bid requests in the user profile.
## Folder Structure
php
Copy code
job-fusion/
├── client/            # React frontend
│   ├── public/
│   ├── src/
│       ├── components/
│       ├── pages/
│       ├── utils/
│       └── App.js
├── server/            # Express backend
│   ├── config/        # Database and other configs
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Authentication middleware
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   └── server.js
└── README.md
