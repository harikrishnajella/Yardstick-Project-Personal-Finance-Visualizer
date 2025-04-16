// controllers/categoryController.js

import Category from '../models/Category.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if category already exists
    const foundCategory = await Category.findOne({ name });
    
    if (foundCategory) {
        return res.status(400).json({ error: 'Category already exist' });
    }
     
    // Create a new category
    const newCategory = new Category(req.body);
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Invalid category data' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if category already exists
    const foundCategory = await Category.findOne({ name });
    
    if (foundCategory) {
        return res.status(400).json({ error: 'Category already exist' });
    }
    
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update category' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete category' });
  }
};
