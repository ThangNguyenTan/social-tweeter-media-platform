import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import apiRoutes from './routes/api.route';
import './config/passport.config';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Middleware
// Enable Helmet middleware for enhanced security headers
app.use(helmet());
// Enable compression middleware to compress response bodies
app.use(compression());
// Apply rate limiting to limit requests from a single IP address
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // maximum 100 requests per minute
  }),
);
// Enable CORS middleware for cross-origin resource sharing
app.use(cors());
// Logging middleware using Morgan
app.use(morgan('combined'));
app.use(passport.initialize());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);
