import mongoose from 'mongoose';

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  color: {
    type: String,
    default: getRandomColor, // Use the random color function as default
  },
});

// Pre-save hook to ensure a random color is generated if not provided
categorySchema.pre('save', function (next) {
  if (!this.color) {
    this.color = getRandomColor();
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
