# LEADO — Agentic AI Lead Generation and Personalized Outreach System

<p align="center">
  <strong>Get Your Lead by Today</strong>
</p>

LEADO is an AI-powered lead generation and personalized outreach platform designed to help businesses discover potential customers, qualify leads, and prepare personalized marketing emails.

The system aims to automate the lead generation workflow using AI agents, business research, lead scoring, and personalized communication.

---

## 1. Project Overview

### 1.1 Introduction

Finding potential customers and reaching them with relevant messages can be time-consuming for businesses.

LEADO aims to simplify this process by allowing users to provide information about their products or services and define their target audience. The system will then research potential customers, identify relevant prospects, evaluate their suitability, and generate personalized email drafts.

The platform supports different types of products and services rather than focusing on a single business category.

**Examples:**
- Computer mouse and accessories
- Clothing and sharee businesses
- Mango and agricultural products
- Software and IT services
- Digital marketing services
- Other products and professional services

### 1.2 Project Objectives

- Automate the lead generation process.
- Discover potential customers based on user-defined criteria.
- Use AI to research and qualify potential leads.
- Generate explainable lead scores.
- Create personalized email drafts.
- Allow users to review and approve emails before sending.
- Provide role-based access for users and administrators.
- Track campaign activities and results.
- Support lead management and CSV export.

---

## 2. Technology Stack

The project uses the MERN ecosystem with additional tools for authentication, AI integration, and email communication.

| Technology | Purpose |
|---|---|
| React.js | Frontend application (planned) |
| HTML, CSS, JavaScript | Current authentication interface |
| Node.js | Backend runtime |
| Express.js | Backend framework and REST APIs |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment configuration |
| Helmet | HTTP security headers |
| CORS | Cross-origin request configuration |
| express-rate-limit | API request limiting |
| Nodemailer | Email delivery (planned) |
| AI / LLM API | Lead research and personalized content (planned) |
| Postman | API testing |
| Git and GitHub | Version control |

---

## 3. System Architecture

LEADO follows a client-server architecture.

```text
                 LEADO SYSTEM
                       |
          ---------------------------
          |                         |
      Frontend                  Backend
          |                         |
    Login / Register          Node.js + Express
    User Dashboard                  |
    Admin Dashboard           REST API Routes
    Campaign Interface             |
                              Authentication
                              JWT + bcrypt
                                   |
                               MongoDB
                                   |
                         AI Agent Workflow
                                   |
                          Lead Generation
                                   |
                         Lead Qualification
                                   |
                         Personalized Emails
                                   |
                          User Approval
                                   |
                            Email Sending
```

**Note:** The AI agent workflow, lead research, scoring, and email automation are planned development modules. They are not yet fully implemented.

---

## 4. User Roles and Authentication

LEADO implements role-based authentication with two account types.

### 4.1 User

Registered users can:

- Register an account.
- Log in and log out.
- Create lead generation campaigns.
- Search for potential customers.
- View and manage generated leads.
- Review lead scores.
- Generate personalized email drafts.
- Approve and send outreach emails.
- Monitor campaign results.
- Export lead information.

### 4.2 Administrator

Administrators can:

- Log in using administrator credentials.
- Access the administrator dashboard.
- Manage registered users.
- Monitor system activities.
- Configure external API integrations.
- Monitor application errors and usage.
- Maintain system configurations and security.

### 4.3 Authentication Rules

| Feature | User | Admin |
|---|---|---|
| Login | Yes | Yes |
| Registration | Yes | No public registration |
| Create campaigns | Yes | According to configured permissions |
| Manage leads | Yes | According to configured permissions |
| User management | No | Yes |
| System monitoring | No | Yes |
| API configuration | No | Yes |

**Important security rules:**

1. Public registration is available only for normal users.
2. Every newly registered account receives the `user` role automatically.
3. Users cannot assign themselves the administrator role.
4. Administrator accounts are created separately through a backend script.
5. Passwords are hashed using bcryptjs.
6. JWT authentication protects private API routes.
7. Role middleware checks authorization on the backend.

### 4.4 Authentication Workflow

```text
                 Start
                   |
               Login Page
                   |
             Enter Credentials
                   |
             Backend Validation
                   |
              JWT Generation
                   |
              Verify User Role
                   |
             ----------------
             |              |
           User            Admin
             |              |
        User Dashboard  Admin Dashboard
             |              |
             ----------------
                   |
                 Logout
                   |
                  End
```

---

## 5. Current Project Structure

The backend currently follows a modular folder structure.

```text
LEADO/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── scripts/
│   │   └── createAdmin.js
│   │
│   ├── public/
│   │   └── index.html
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
└── README.md
```

### Folder Responsibilities

| Folder/File | Responsibility |
|---|---|
| config | Database connection |
| controllers | Authentication and application logic |
| middleware | Authentication, authorization, and error handling |
| models | MongoDB database schemas |
| routes | API endpoint definitions |
| scripts | Administrative utility scripts |
| public | Current browser-based frontend |
| server.js | Express application configuration |
| .env | Environment variables and secrets |

The frontend can later be moved into a separate React application using Vite.

---

## 6. Installation and Setup

### 6.1 Prerequisites

Install the following software:

- Node.js and npm
- MongoDB Community Server or MongoDB Atlas
- MongoDB Shell (mongosh), recommended for local database testing
- Visual Studio Code
- Git
- Postman (for API testing)

Useful links:

- Node.js: https://nodejs.org/
- MongoDB Community Server: https://www.mongodb.com/try/download/community
- MongoDB Shell: https://www.mongodb.com/try/download/shell
- MongoDB Atlas: https://www.mongodb.com/products/platform/atlas-database
- Postman: https://www.postman.com/

### 6.2 Clone the Repository

```bash
git clone https://github.com/samiaaktererin/Leado-Lead_Generation_website.git
```

Navigate into the backend directory:

```bash
cd Leado-Lead_Generation_website/backend
```

### 6.3 Install Dependencies

```bash
npm install
```

The main backend dependencies include:

```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet express-rate-limit
```

Install Nodemon for development:

```bash
npm install -D nodemon
```
Generate a random JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 6.4 Start MongoDB

For a local Windows installation, open PowerShell as Administrator:

```powershell
Start-Service MongoDB
```

Check the service:

```powershell
Get-Service MongoDB
```

Test the MongoDB shell:

```powershell
mongosh
```

Check databases:

```javascript
show dbs
```

### 6.7 Create the Administrator Account

After configuring `.env` and connecting MongoDB:

```bash
npm run create-admin
```

This script creates the administrator account using the credentials defined in `.env`.

### 6.6 Start the Backend

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The application will run at:

```text
http://localhost:5000
```

---

## 7. Current Frontend Interface

The current frontend is served directly through the Express `public` folder.

Open:

```text
http://localhost:5000/
```

### 7.1 Login Interface

The login page provides two login options:

- User Login
- Admin Login

Both use the backend login API. The frontend checks that the role returned by the backend matches the selected login type.

### 7.2 User Registration

New users can register with:

- Full name
- Email address
- Password

The backend automatically assigns the `user` role.

There is no public administrator registration.

### 7.3 Role-Based Dashboards

**User Dashboard**

- Create Campaign
- Find Leads
- Manage Leads
- Email Outreach
- Campaign Results
- Export Leads

**Admin Dashboard**

- User Management
- System Monitoring
- API Integrations
- Activity Monitoring
- Security Management
- System Settings

The dashboard cards currently represent planned application features. They will be connected to actual backend functionality as development progresses.

---

## 8. Backend API Documentation

Base URL:

```text
http://localhost:5000
```

### 8.1 Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Checks backend and database connection |

Example:

```http
GET /api/health
```

### 8.2 Authentication APIs

Base route:

```text
/api/auth
```

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login for user and admin |
| GET | `/api/auth/me` | Authenticated | Get current user details |
| POST | `/api/auth/logout` | Authenticated | Invalidate the user's tokens |
| GET | `/api/auth/user` | User | Test user authorization |
| GET | `/api/auth/admin` | Admin | Test administrator authorization |

### 8.3 Registration Request

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```

The backend assigns the role automatically.

### 8.4 Login Request

```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```

### 8.5 Protected API Request

Include the JWT token in the request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### 8.6 Role-Based Authorization

The backend uses role middleware to protect restricted endpoints.

Example:

```javascript
router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted"
    });
  }
);
```

Unauthorized access should return:

```http
403 Forbidden
```

Unauthenticated access should return:

```http
401 Unauthorized
```

---

## 9. Database Design

The project uses MongoDB with Mongoose.

### 9.1 User Collection

The current User model contains:

| Field | Data Type | Description |
|---|---|---|
| name | String | User's full name |
| email | String | Unique email address |
| password | String | Hashed password |
| role | String | `user` or `admin` |
| tokenVersion | Number | JWT invalidation version |
| isActive | Boolean | Account activation status |
| createdAt | Date | Account creation time |
| updatedAt | Date | Last update time |

### 9.2 Planned Collections

The following collections will be introduced as the application develops:

| Collection | Purpose |
|---|---|
| Users | Store user and administrator accounts |
| Campaigns | Store lead generation campaigns |
| Leads | Store potential customer information |
| OutreachEmails | Store personalized email drafts and sending records |
| Activities | Track user and system activities |
| Integrations | Store integration configuration metadata |

These are proposed future database collections, not all currently implemented.

---

## 10. Planned Lead Generation Workflow

The main LEADO workflow will be developed in stages.

### Step 1: Campaign Creation

Users provide:

- Product or service details
- Target audience
- Target location
- Desired number of leads
- Campaign objective
- Additional constraints

### Step 2: AI-Assisted Research

The system uses permitted business data sources and AI assistance to discover relevant prospects.

### Step 3: Lead Qualification

The system evaluates potential customers based on campaign criteria.

### Step 4: Lead Scoring

Each lead receives an explainable score from 0 to 100.

The scoring process will consider factors such as:

- Relevance to the product or service
- Match with the target audience
- Location relevance
- Available business information
- Other campaign-specific criteria

### Step 5: Personalized Email Generation

AI generates personalized email drafts based on the prospect's available business information and the campaign objective.

### Step 6: Human Approval

Users review and edit email drafts before approving them.

Automatic sending without user approval will not be enabled in the initial workflow.

### Step 7: Email Outreach and Tracking

Approved emails can be sent through the configured email service. Campaign activity and available results will be tracked.

### Step 8: Export and Analytics

Users can view campaign results and export lead information in CSV format.

---

## 11. Security Considerations

Security is an important part of LEADO.

Current and planned security measures include:

- Password hashing using bcryptjs.
- JWT-based authentication.
- Role-based authorization middleware.
- Protected backend routes.
- Environment variables for sensitive credentials.
- Helmet security headers.
- Authentication API rate limiting.
- Input validation.
- Unique email addresses.
- Account activation checks.
- User ownership checks for private resources.
- Human approval before email outreach.

**Production security improvements:**

- Configure a proper Content Security Policy.
- Use HTTPS.
- Review secure token storage and consider HttpOnly cookies with CSRF protection.
- Apply stricter validation and rate limits.
- Implement secure logging and audit trails.
- Restrict API keys and external integration permissions.

The current development frontend stores the JWT in browser localStorage for testing. This is a development approach and should be reviewed before production deployment.

---

## 12. Testing

### 12.1 Frontend Testing

Open:

```text
http://localhost:5000/
```

Test the following:

| Test Case | Expected Result |
|---|---|
| Open login page | Login interface appears |
| Select User Login | User login mode is selected |
| Select Admin Login | Admin login mode is selected |
| Register a new user | Account is created with `user` role |
| Register duplicate email | Error message appears |
| Login with valid user credentials | User dashboard appears |
| Login with valid admin credentials | Admin dashboard appears |
| Use admin credentials in User Login | Role mismatch message appears |
| Use user credentials in Admin Login | Role mismatch message appears |
| Enter incorrect password | Login fails |
| Logout | Session is invalidated |
| Access protected endpoint without token | 401 response |
| Access restricted endpoint with wrong role | 403 response |

### 12.2 API Testing

Use Postman to test:

1. User registration.
2. User login.
3. Admin login.
4. Get current user information.
5. User authorization.
6. Admin authorization.
7. Logout.
8. Invalid and expired JWT tokens.

### 12.3 Database Testing

Verify that:

- User accounts are saved in MongoDB.
- Duplicate email addresses are rejected.
- Passwords are hashed.
- User roles are assigned correctly.
- Administrator accounts are created through the backend script.

---

## 13. Development Roadmap

The project will be developed incrementally.

### Phase 1: Backend Foundation and Authentication

- [x] Initialize Node.js and Express backend.
- [x] Configure MongoDB connection.
- [x] Create User model.
- [x] Implement user registration.
- [x] Implement login.
- [x] Implement bcrypt password hashing.
- [x] Implement JWT authentication.
- [x] Implement role-based authorization middleware.
- [x] Implement administrator creation script.
- [x] Create login and registration interface.
- [x] Add separate user and admin login modes.
- [x] Add separate role-based dashboards.
- [ ] Complete MongoDB connection and end-to-end authentication testing.

### Phase 2: Frontend Development

- [ ] Initialize React with Vite.
- [ ] Create reusable components.
- [ ] Implement routing.
- [ ] Connect React frontend to backend APIs.
- [ ] Implement protected routes.
- [ ] Build user dashboard.
- [ ] Build administrator dashboard.
- [ ] Add responsive design.

### Phase 3: Campaign Management

- [ ] Create Campaign model.
- [ ] Implement campaign creation API.
- [ ] Implement campaign update and deletion.
- [ ] Add target audience and location filters.
- [ ] Implement campaign history.
- [ ] Enforce campaign ownership.

### Phase 4: Lead Generation

- [ ] Research permitted business data sources.
- [ ] Implement prospect discovery.
- [ ] Create Lead model.
- [ ] Store discovered leads.
- [ ] Implement duplicate lead detection.
- [ ] Add search and filtering.
- [ ] Implement lead ownership.

### Phase 5: Agentic AI Integration

- [ ] Integrate an LLM API.
- [ ] Design the AI agent workflow.
- [ ] Implement research and qualification steps.
- [ ] Implement lead scoring.
- [ ] Generate personalized email drafts.
- [ ] Add AI output validation and error handling.

### Phase 6: Email Outreach

- [ ] Configure Nodemailer and SMTP.
- [ ] Implement email draft management.
- [ ] Implement user approval workflow.
- [ ] Send approved emails.
- [ ] Track sending status.
- [ ] Store outreach history.

### Phase 7: Analytics and Administration

- [ ] Implement dashboard statistics.
- [ ] Add campaign performance reports.
- [ ] Implement CSV export.
- [ ] Build administrator user management.
- [ ] Add system activity monitoring.
- [ ] Add integration management.
- [ ] Implement audit logging.

### Phase 8: Final Testing and Deployment

- [ ] Complete backend API testing.
- [ ] Complete frontend testing.
- [ ] Test role-based security.
- [ ] Test database operations.
- [ ] Test AI workflow.
- [ ] Test email approval and sending.
- [ ] Fix bugs and improve performance.
- [ ] Prepare deployment configuration.
- [ ] Deploy the application.

---

## 14. Development Commands

Run these commands from the `backend` directory.

| Command | Purpose |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm start` | Start production server |
| `npm run create-admin` | Create administrator account |

### Important URLs

| Resource | URL |
|---|---|
| LEADO Frontend | http://localhost:5000/ |
| Backend Health | http://localhost:5000/api/health |
| Registration API | http://localhost:5000/api/auth/register |
| Login API | http://localhost:5000/api/auth/login |
| Current User API | http://localhost:5000/api/auth/me |

---

## 15. Current Development Status

**Project:** LEADO — Agentic AI Lead Generation and Personalized Outreach System

**Current focus:** Backend development and role-based authentication.

**Implemented so far:**

- Express backend foundation.
- MongoDB and Mongoose configuration.
- User authentication model.
- Registration and login APIs.
- Password hashing.
- JWT authentication middleware.
- Role-based authorization middleware.
- Administrator creation script.
- Browser-based login and registration interface.
- Separate user and administrator login modes.
- Separate role-based dashboards.
- API permission testing interface.

**Next development priority:**

Complete local MongoDB connectivity and test the full authentication workflow. After authentication is verified, move to the React frontend and campaign management module.

---

## 16. Author and Repository

**Project Name:** LEADO

**Project Type:** Agentic AI Lead Generation and Personalized Outreach System

**Development Approach:** Backend-first, followed by frontend integration and AI workflow development.

**GitHub Repository:**

https://github.com/samiaaktererin/Leado-Lead_Generation_website

---

*LEADO — Get Your Lead by Today.*
