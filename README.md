# Employee Management System (MERN Stack)

A web application to manage employees with **CRUD operations**, **search**, **filter**, and **image upload** functionality. Built using **MongoDB, Express, React, Node.js (MERN)** stack with **Mongoose validation** and **toast notifications** for admin feedback.


## Features

* **Create Employee:** Add a new employee with full details and optional photo.
* **Validation:**

  * Full name: letters and spaces only, 3–50 characters.
  * Email: valid and unique.
  * Phone: exactly 10 digits.
  * Date of Birth: minimum age 18.
  * Department: HR, IT, Finance, Marketing, Sales.
  * Gender: Male, Female, Other.
  * Photo: jpg, jpeg, png, webp.
* **Get Employees:**

  * Search by `fullName`.
  * Filter by `department`, `designation`, `gender`.
  * Sort by newest created first.
* **Error Handling:** Validation errors displayed in **toast notifications**.
* **Photo Upload:** Supports employee photos via `multer`.
* **Responsive UI:** Works on desktop and mobile devices.


## Tech Stack

* **Frontend:** React, Tailwind CSS, React Toastify
* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)
* **File Upload:** Multer
* **Deployment:** Render / Localhost

---

## Installation

### Backend

1. Clone the repository:

```bash
git clone <repo-url>
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
```

4. Start the server:

```bash
npm run dev
```

### Frontend

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start React app:

```bash
npm start
```

---

## API Endpoints

### 1. Create Employee

```
POST /api/employees
```

* **Body (JSON / FormData):**

```json
{
  "fullName": "John Doe",
  "dob": "1995-05-20",
  "email": "john@example.com",
  "phone": "9876543210",
  "department": "IT",
  "designation": "Developer",
  "gender": "Male",
  "photo": "optional file upload"
}
```

* **Response:**

```json
{
  "success": true,
  "message": "Employee created successfully",
  "employee": { ... }
}
```

* **Error Response (Validation):**

```json
{
  "success": false,
  "messages": ["Full name must be at least 3 characters", "Email already exists"]
}
```

---

### 2. Get Employees

```
GET /api/employees?search=John&department=IT&designation=Developer&gender=Male
```

* **Query Parameters (Optional):**

  * `search` → matches `fullName`, `email`, `department`, `designation`, `gender`
  * `department` → exact match filter
  * `designation` → exact match filter
  * `gender` → exact match filter

* **Response:**

```json
[
  {
    "_id": "123",
    "fullName": "John Doe",
    "dob": "1995-05-20T00:00:00.000Z",
    "email": "john@example.com",
    "phone": "9876543210",
    "department": "IT",
    "designation": "Developer",
    "gender": "Male",
    "photo": "uploads/12345-photo.png",
    "createdAt": "2026-02-20T00:00:00.000Z",
    "updatedAt": "2026-02-20T00:00:00.000Z"
  }
]
```

---

## Folder Structure

```
backend/
│  server.js
│  .env
│  models/
│     Emp.js
│  controllers/
│     employeeController.js
│  routes/
│     employeeRoutes.js
frontend/
│  src/
│     components/
│     pages/
│     App.js
│     index.js
```

---

## Notes/Limitations:

* **Toast Notifications:** All validation and server errors are displayed using toast notifications for easy admin feedback.
* **Image Upload:** Uses multer to store photos in `/uploads` directory.
* **Search & Filter:** Fully functional combined search + filters for `fullName`.
* **The app currently works well on desktop screens; mobile responsiveness is limited and can be improved in future updates.
* **Admin-only access is implemented; non-admin users receive a “403 Access Denied” response for protected routes.
* **Validation errors are displayed via toast notifications for better feedback.
* **Currently, employee photos are stored locally using multer. Using Cloudinary for cloud storage is a possible improvement for scalability.
* **The app works well on desktop screens; mobile responsiveness is limited and can be improved.
* **Admin-only access is implemented; non-admin users receive a “403 Access Denied” response.
**Validation errors are displayed via toast notifications.

