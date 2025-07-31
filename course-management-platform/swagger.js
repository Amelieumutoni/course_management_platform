// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Course Management Platform API',
      version: '1.0.0',
      description: 'API documentation for the Course Management Platform',
    },
    servers: [
      {
        url: 'http://localhost:5000', 
      },
    ],
  },
  apis: [__dirname + '/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;