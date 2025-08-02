# Course Management Platform

A comprehensive multi-feature backend system for academic institutions to support faculty operations, monitor student progress, and enhance academic coordination. Built with Node.js, Express, MySQL, and Redis.

---

## 📌 Project Overview

### THIS PLATFORM CONSISTS OF 3 MODULES:

- **Course Allocation System** – Manage facilitator assignments to courses  
- **Facilitator Activity Tracker** – Track weekly activities and automate compliance monitoring  
- **Student Reflection Page** – Multilingual reflection interface with i18n/l10n support

---

## 📁 Project Structure

course-management-platform/

├── tests/ # Unit tests

├── config/ # Configuration files (database, etc.)

├── controllers/ # Route controllers

├── middleware/ # Custom middleware (auth, validation)

├── models/ # Sequelize models

├── routes/ # API routes

├── utils/ # Utility functions (Redis publisher, etc.)

├── workers/ # Background job workers

├── server.js # Main application entry point

├── swagger.js # API documentation setup

└── .env # Environment variables

student-reflection-page/ # Module 3 - i18n webpage

├── index.html

├── index.js

├── translations.js

└── styles.css

---
## ✅ Backend Features Implemented

- **Role-based Access Control**: Managers can create/update allocations, Facilitators can view assignments
-   
- **CRUD Operations**: Complete course allocation management
- 
- **Filtering**: Filter by trimester, cohort, intake, facilitator, and mode
- 
- **Relationship Management**: Comprehensive model relationships with foreign keys
- 
- **Weekly Activity Logging**: Track attendance, grading, moderation, and sync status
-  
- **Automated Notifications**: Redis-backed notification system with cron jobs
- 
- **Manager Dashboard**: View all logs with filtering capabilities
-   
- **Multilingual Support**: Dynamic language switching (English/French)
-  
- **GitHub Pages Deployment**: Live hosted reflection page  

---

## 🧰 Tech Stack Used

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MySQL with Sequelize ORM  
- **Authentication**: JWT with bcrypt password hashing  
- **Message Queue**: Redis for notifications  
- **Documentation**: Swagger UI for API documentation  
- **Testing**: Jest for unit testing  

### Frontend
- **Languages**: HTML5, CSS3, Vanilla JavaScript  
- **Internationalization**: Custom i18n implementation  
- **Storage**: LocalStorage for language preferences  

---

## ⚙️ Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/Aumutoni/course-management-platform.git
cd course-management-platform

Install Dependencies
npm install
Environment Configuration
Create a .env file in the root directory:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Amelieum2003?!
DB_NAME=course-db
DB_PORT=5000

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=Amelieum2003

# Server Configuration
PORT=5000
NODE_ENV=development
#Redis Setup
Start Redis server:
redis-server
Make sure Redis is running:
redis-cli ping
# → PONG
Run the App

# Start backend server
node server.js

# Start notification worker
node workers/remindercron.js


##DOCUMENTS##
*video link*: https://www.loom.com/share/b840d05459ee4bbba765f692213c757e?sid=6c08146e-6f73-46e9-99c4-454cc7d38844

*api documentation*:https://drive.google.com/file/d/1N_w5ThAMNf_6rNbdBt07o1fPyFiMtdBj/view?usp=sharing

*Hosted document module 3 *:








