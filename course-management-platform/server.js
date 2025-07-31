require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');



const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


const app = express();
app.use(cors());
app.use(express.json());

// Swagger docs route (moved here)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import Models
const User = require('./models/user');
const Module = require('./models/module');
const Cohort = require('./models/cohort');
const Class = require('./models/class');
const Mode = require('./models/mode');
const CourseOffering = require('./models/courseoffering');
const ActivityTracker = require('./models/activitytracker'); 

// Import Routes
const authRoutes = require('./routes/auth');
const courseofferingRoutes = require('./routes/courseoffering');
const activityTrackerRoutes = require('./routes/activitytrackerroutes'); 

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/course-offerings', courseofferingRoutes);
app.use('/api/activitylogs', activityTrackerRoutes); 

// Test Route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Sync database and start server
const PORT = 5000;
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log('Database sync error:', err));
