# React Authentication & Dashboard Application

This project is a simple React authentication system with protected routing and a dashboard interface. It demonstrates frontend authentication using React Hooks, Axios, JSON Server, React Router DOM, LocalStorage, and Tailwind CSS.

The application includes:

- User Signup
- User Signin
- Route Protection
- Dashboard Access
- Logout Functionality

Authentication is handled on the client side using LocalStorage, and JSON Server is used as a mock backend.

------------------------------------------------------------

## Project Architecture Overview

Flow of the application:

Signup → Store user in JSON Server  
Signin → Validate credentials  
If valid → Store user in LocalStorage  
Protected Route → Check authentication  
Dashboard → Accessible only if logged in  
Logout → Remove user from LocalStorage  

------------------------------------------------------------

## Backend Configuration (JSON Server)

Base API URL:
http://localhost:3001/users

Sample db.json structure:

{
  "users": [
    {
      "id": 1,
      "email": "admin@gmail.com",
      "password": "1234"
    }
  ]
}

API operations used:

GET    → Check user credentials  
GET    → Check if email already exists  
POST   → Register new user  

------------------------------------------------------------

# Component Explanation

============================================================
1. ProtectedRoutes.jsx
============================================================

Purpose:
This component protects private routes such as the dashboard. It prevents unauthenticated users from accessing protected pages.

Core Logic:

- Reads "user" from LocalStorage.
- If no user exists, redirect to Signin page.
- If user exists, render the protected component.

Implementation Flow:

1. Retrieve user from LocalStorage:
   const user = localStorage.getItem("user");

2. If user is null:
   Redirect using <Navigate to="/" replace />

3. If user exists:
   Return children (protected component)

Important:
The "replace" prop prevents users from going back to the protected page using the browser back button.

This acts as a Route Guard.

------------------------------------------------------------

============================================================
2. Signin.jsx
============================================================

Purpose:
Authenticates users using email and password stored in JSON Server.

State Management:

useState is used for:
- email
- password

Controlled Inputs:
Both inputs are controlled components bound to state values.

API Logic:

When the form is submitted:

1. Prevent default form behavior.
2. Send GET request:

   axios.get(`${apiUrl}?email=${email}&password=${password}`)

JSON Server automatically filters records using query parameters.

Example:
GET /users?email=test@gmail.com&password=1234

Response Behavior:

- If credentials match → response.data.length = 1
- If no match → response.data.length = 0

Condition Handling:

If response.data.length > 0:
- Store user in LocalStorage:
  localStorage.setItem("user", JSON.stringify(response.data[0]));
- Redirect to "/dashboard"

Else:
- Show alert "Invalid Credentials"

Authentication Storage:

The entire user object is stored in LocalStorage under the key "user".

------------------------------------------------------------

============================================================
3. Signup.jsx
============================================================

Purpose:
Registers a new user into JSON Server database.

State Management:

useState is used for:
- email
- password

Registration Logic:

Step 1: Check if Email Already Exists

axios.get(`${apiUrl}?email=${email}`)

If response.data.length > 0:
- User already exists
- Show alert
- Stop execution using return

Step 2: Create New User

If no user exists:

axios.post(apiUrl, {
  email,
  password
});

This creates a new user entry inside JSON Server.

After successful signup:
- Show success alert
- Navigate to Signin page

Duplicate Prevention Logic:

The system prevents duplicate accounts by checking if the email already exists before inserting new data.

------------------------------------------------------------

============================================================
4. Dashboard.jsx
============================================================

Purpose:
Displays protected dashboard content for authenticated users.

Access Condition:
This page is wrapped inside ProtectedRoutes component, so it is accessible only if LocalStorage contains a valid user.

Structure:

1. Sidebar
   - Navigation buttons (UI only)
   - Logout button

2. Navbar
   - Static username display
   - User avatar circle

3. Main Content
   - Welcome section
   - Statistics cards
   - Recent activity list

Logout Logic:

handleLogout function:

1. Remove user from LocalStorage:
   localStorage.removeItem("user");

2. Redirect to Signin page:
   navigate("/");

After logout:
ProtectedRoutes will block dashboard access automatically.

------------------------------------------------------------

# Routing Structure

/           → Signin (Public)
/signup     → Signup (Public)
/dashboard  → Protected (Private)

The dashboard route is wrapped with ProtectedRoutes to enforce authentication.

------------------------------------------------------------

# Authentication Mechanism

This project uses simple client-side authentication.

How it works:

1. Signup stores user in JSON Server.
2. Signin verifies credentials using GET request.
3. On success, user object is saved in LocalStorage.
4. ProtectedRoutes checks LocalStorage for authentication.
5. Logout removes LocalStorage entry.

Important Note:
This is NOT secure for production.

------------------------------------------------------------

# Security Limitations (Educational Purpose Only)

- Passwords are stored in plain text.
- No password hashing.
- No backend authentication validation.
- No JWT or tokens.
- LocalStorage can be manually edited.
- No session expiration.

For production systems:

- Use backend authentication.
- Hash passwords using bcrypt.
- Use JWT or OAuth.
- Store tokens in HTTP-only cookies.
- Implement role-based authorization.

------------------------------------------------------------

# Hooks Used

useState
- Manage form inputs.

useNavigate
- Programmatic navigation.

useEffect
- Imported but not actively used in the dashboard.

------------------------------------------------------------

# Core Functional Concepts Demonstrated

- Controlled Forms
- Form Submission Handling
- Conditional Logic
- Axios API Calls
- Query Parameter Filtering
- JSON Server CRUD Operations
- Route Protection
- Client-side Authentication
- LocalStorage Persistence
- Logout Handling

------------------------------------------------------------

# Complete User Journey

1. User opens application.
2. User registers (Signup).
3. Data stored in JSON Server.
4. User logs in (Signin).
5. Credentials validated via GET request.
6. User object stored in LocalStorage.
7. ProtectedRoutes allows Dashboard access.
8. User logs out.
9. LocalStorage cleared.
10. Dashboard access blocked again.

------------------------------------------------------------

# Conclusion

This project demonstrates a complete frontend authentication workflow using:

- React Hooks
- Axios
- JSON Server
- React Router DOM
- Tailwind CSS
- LocalStorage-based session handling

It is ideal for learning:

- Authentication flow
- Route protection
- API communication
- Form handling
- State management
- CRUD operations
