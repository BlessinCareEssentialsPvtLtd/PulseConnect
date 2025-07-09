import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/connectDB.js';
import healthRecordRoutes from './routes/healthRecords.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/records', healthRecordRoutes); // Mounting health record upload API

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
