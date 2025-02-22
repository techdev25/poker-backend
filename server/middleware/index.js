const express = require("express");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
// const helmet = require('helmet');
const xssClean = require("xss-clean");
const expressRateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const logger = require("./logger");

const configureMiddleware = (app) => {
  // Body-parser middleware
  app.use(
    cors({
      origin: "https://poker-frontend.netlify.app/", // Replace with your allowed origin
      methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
  );
  app.use(express.json());

  // Cookie Parser
  app.use(cookieParser());

  // MongoDB data sanitizer
  app.use(mongoSanitize());

  // Helmet improves API security by setting some additional header checks
  // app.use(helmet());

  // Additional protection against XSS attacks
  app.use(xssClean());

  // Add rate limit to API (100 requests per 10 mins)
  app.use(
    expressRateLimit({
      windowMs: 10 * 60 * 1000,
      max: 100,
    })
  );

  // Prevent http param pollution
  app.use(hpp());

  // Custom logging middleware
  app.use(logger);
};

module.exports = configureMiddleware;
