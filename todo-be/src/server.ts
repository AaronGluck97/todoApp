import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todosRouter from './controllers/Todo.controller';

// Initialize database
import db from './db/database';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: any, res: any) => {
  res.json({ message: 'Todo API Server is running!' });
});

// API Routes
app.use('/api/todos', todosRouter);

// Error handling middleware
app.use((err: Error, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req: any, res: any) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
