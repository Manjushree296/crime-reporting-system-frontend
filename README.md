# Crime Reporting System - Frontend (React)
This is the **frontend** of the Crime Reporting System project, built with **React**, **React Router**, and **Bootstrap**.  
It provides two dashboards:
- **Citizen Dashboard**: Citizens can log in, report crimes, and track their case status.
- **Police Dashboard**: Officers can log in, view assigned cases, investigate, or reject them with reasons.   
## 🚀 Features  
### Citizen  
- Register & Login
- Submit new crime reports   
- View list of submitted reports and their status  
### Police
- View assigned reports
- Mark a report as **Investigated**
- Reject a report with a reason
## 📦 Tech Stack
- **React 18**
- **React Router DOM v6**
- **Bootstrap 5**
- **Axios** for API calls
- **JWT Authentication** (integrated with backend)


## ⚙️ Installation & Setup

1. **Clone the repository**

   git clone https://github.com/your-username/crime-reporting-frontend.git
   cd crime-reporting-frontend
Install dependencies


npm install
Update Backend API URL

Open src/services/api.js (or wherever you store the base API URL)

export const API_URL = "http://localhost:8080/api";
with your backend URL.

Start the development server
npm start
The app will run on http://localhost:3000

🔑 Authentication
Uses JWT tokens from backend.

Stored in localStorage.

Token is sent in Authorization: Bearer <token> header for protected routes.

🧪 Testing the App
Register a new user via the Register page.

Login as Citizen or Officer.

Test:

Citizen → Submit & track reports

Police → Approve or Reject reports
Ensure the backend is running on the port you specify in API_URL.

You must have Node.js v18+ installed.
