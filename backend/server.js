// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// Import Routes
import transactionRoutes from './routes/transactionRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';

import Category from './models/Category.js';

const predefinedCategories = [
    { name: 'Groceries', color: '#FF6384' },
    { name: 'Rent', color: '#36A2EB' },
    { name: 'Utilities', color: '#FFCE56' },
    { name: 'Transportation', color: '#4BC0C0' },
    { name: 'Entertainment', color: '#9966FF' },
    { name: 'Healthcare', color: '#FF9F40' },
    { name: 'Dining Out', color: '#E7E9ED' },
    { name: 'Education', color: '#A9A9A9' }
];


const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost:27017'

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/budgets', budgetRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Personal Finance Visualizer API is running');
});


const seedCategories = async () => {
    const existing = await Category.find({});
    if (existing.length === 0) {
      await Category.insertMany(predefinedCategories);
      console.log('Predefined categories seeded!');
    } else {
      console.log('Categories already exist.');
    }
};

seedCategories()


// Connect to MongoDB and start server
mongoose.connect(MONGO_URL)
.then(() => console.log('MongoDB Connected....'))
.catch(err => console.error('MongoDB connection failed:', err.message));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}....`);
});


