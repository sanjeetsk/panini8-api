import express from 'express';
import connectDB from './src/config/db.config.js';
import bodyParser from 'body-parser';
import authRouter from './src/features/routes/authRoute.js';
import postRouter from './src/features/routes/postRoute.js';
import cors from "cors";

const app = express();


app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);  // Allow all origins
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,  // Allow cookies & authentication
}));


// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);

// Connect to database
connectDB();

// Start server
const port = process.env.PORT;
app.get('/', (req, res) => {
  res.send('Welcome to Panini8 blog API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});