import express from 'express';
import mongoose from 'mongoose';
import { Category } from '../models/category-model.js';

const app = express();
const PORT = 3000; 

app.use(express.json());

connection()

app.get('/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;


    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
