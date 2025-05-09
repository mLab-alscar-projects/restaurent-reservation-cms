# Restaurant Reservation Management System

## Overview
A comprehensive restaurant reservation management system with a React Native frontend and MongoDB backend. The system allows restaurant administrators to manage reservations, restaurant details, and user data through a centralized CMS (Content Management System).

## Credentials
- email: aurora@alscar.com
- password : Oscar@2024

## Features
- Table reservation management
- Restaurant profile management
- User management system 
- Image storage integration with Firebase
- Real-time updates on reservation status
- Administrative dashboard for analytics

## Tech Stack
### Frontend
- React Native
- Expo
- React Navigation
- Firebase Storage 

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Expo CLI
- Firebase account and project setup

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/oscarpoco/mLab-alscar-projects/restaurent-reservation-cms.git
cd restaurent-reservation-cms
```

### 2. Frontend Setup (React Native)
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development app
npx expo start -c
```

### 3. Backend Setup (MongoDB & Express)
```bash
# Navigate to server directory from main directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT

# Start development server
npm run dev
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=
JWT_SECRET=
PORT=
```

## File Structure
```
├── client/
│   ├── assets/
│   ├── components/
│   ├── firebase/
│   ├── styles/
│   ├── app.json
│   ├── AuthContext
│   ├── App.js
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│
└── server/
    │   ├── config/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   └── utils/
    │   ├── server.js
    │   ├── package-lock.json
    │   └── package.json
```

## Development
- Run frontend: `npx expo start -c`
- Run backend: `npm run dev`
- Access CMS: `Expo-Go`

## Testing
```bash
# Frontend tests
cd client
npm run test

# Backend tests
cd server
npm run test
```

## Deployment
1. Deploy backend to your preferred hosting service
2. Update frontend API configuration
3. Build and deploy frontend to app stores or build for expo testing
4. Configure environment variables on hosting platform

## User Guide
### The user guide is for both CMS and ADMIN REGISTER APPS
- https://docs.google.com/document/d/1hfre7d8EEEO0MKkQEIykZgPm5pCHrRP5m-34usdk5wc/edit?usp=sharing

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the mLab 

## Support
For support open an issue in the repository.
