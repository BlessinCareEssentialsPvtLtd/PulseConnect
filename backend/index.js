import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../backend/utls/connectDB.js'; // Adjust the path as necessary

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Example route import
// import userRoutes from './routes/userRoutes.js';
// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
