# 💪 MERN Workout Tracker

A full-stack workout tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication and complete CRUD operations for workout management.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens and bcrypt password hashing
- **Workout Management**: Create, read, update, and delete workout sessions
- **User-Specific Data**: Each user can only view and manage their own workouts
- **Responsive Design**: Modern, clean UI built with React
- **Real-time Updates**: Instant UI updates using React Context
- **Secure API**: Protected routes with JWT middleware
- **Input Validation**: Client and server-side validation

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **React Context** for state management
- **Custom Hooks** for reusable logic
- **CSS3** for styling
- **Fetch API** for HTTP requests

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests
- **dotenv** for environment variables

## 📁 Project Structure

```
Mern-workout/
├── backend/
│   ├── controllers/
│   │   ├── usersControllers.js    # User auth logic
│   │   └── workoutsControllers.js # Workout CRUD operations
│   ├── middleware/
│   │   └── requireAuth.js         # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Workout.js            # Workout schema
│   ├── routes/
│   │   ├── usersRoutes.js        # Auth routes
│   │   └── workoutsRoutes.js     # Workout routes
│   ├── .env                      # Environment variables
│   ├── .gitignore               # Backend gitignore
│   ├── package.json             # Backend dependencies
│   └── server.js                # Express server setup
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.jsx        # Navigation component
│   │   │   ├── WorkoutCard.jsx   # Individual workout display
│   │   │   └── WorkOutForm.jsx   # Workout creation form
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Authentication state
│   │   │   └── WorkOutContext.jsx # Workout state
│   │   ├── hooks/
│   │   │   ├── useAuthContext.js
│   │   │   ├── useLogin.js
│   │   │   ├── useLogOut.js
│   │   │   ├── useSignUpPage.js
│   │   │   └── useWorkOutContext.js
│   │   ├── pages/
│   │   │   ├── Homepage.jsx      # Main workout dashboard
│   │   │   ├── LoginPage.jsx     # User login
│   │   │   └── SignUpPage.jsx    # User registration
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # React app entry point
│   ├── .gitignore              # Frontend gitignore
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Mern-workout
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   SECRET=your_jwt_secret_key
   ```

4. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:4000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application runs on `http://localhost:5173`

## 📋 API Endpoints

### Authentication Routes
- `POST /api/users/signup` - Register a new user
- `POST /api/users/login` - User login

### Workout Routes (Protected)
- `GET /api/workouts` - Get all user workouts
- `POST /api/workouts` - Create a new workout
- `GET /api/workouts/:id` - Get a specific workout
- `PATCH /api/workouts/:id` - Update a workout
- `DELETE /api/workouts/:id` - Delete a workout

## 🔐 Authentication Flow

1. User registers/logs in with email and password
2. Server validates credentials and returns JWT token
3. Client stores token and includes it in subsequent requests
4. Protected routes verify token before granting access
5. User-specific data is filtered by user ID

## 🎨 Key Features Implementation

### State Management
- **AuthContext**: Manages user authentication state globally
- **WorkoutContext**: Handles workout data and CRUD operations
- **Custom Hooks**: Encapsulate complex logic for reusability

### Security Features
- Password hashing with bcrypt (salt rounds: 10)
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- Environment variables for sensitive data

### User Experience
- Responsive design for mobile and desktop
- Real-time UI updates without page refresh
- Form validation with error handling
- Loading states and user feedback

## 🧪 Testing

To test the application:

1. **Register a new user** on the signup page
2. **Login** with your credentials
3. **Create workouts** using the workout form
4. **View, edit, or delete** workouts from the dashboard
5. **Logout** to test authentication flow

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, Railway)
1. Set environment variables in your hosting platform
2. Deploy the backend folder
3. Update frontend API URLs to production backend URL

### Frontend Deployment (e.g., Netlify, Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username]
- Email: your.email@example.com

## 🙏 Acknowledgments

- MongoDB documentation and community
- React and Express.js teams
- JWT.io for authentication guidance
- Stack Overflow community for troubleshooting

---

⭐ **Star this repository if you found it helpful!**
