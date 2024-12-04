import { model, Schema } from 'mongoose';
import { IBook } from './book.interface';

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: [true, 'The title of the book is required.'],
  },
  author: {
    type: String,
    required: [true, 'The author of the book is required.'],
  },
  price: {
    type: Number,
    required: [true, 'The price of the book is required.'],
    min: [0, 'Price must be a positive number.'],
  },
  category: {
    type: String,
    enum: {
      values: ['Fiction', 'Science', 'Self Development', 'Poetry', 'Religious'],
      message:
        'Category must be one of the following: Fiction, Science, Self Development, Poetry, Religious.',
    },
    required: [true, 'The category of the book is required.'],
  },
  description: {
    type: String,
    required: [true, 'A description of the book is required.'],
    minlength: [10, 'Description must be at least 10 characters long.'],
  },
  quantity: {
    type: Number,
    required: [true, 'The quantity of the book is required.'],
    min: [1, 'Quantity must be at least 1.'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'Please specify if the book is in stock.'],
  },
});

export const Book = model<IBook>('Book', bookSchema);
