export interface IBook {
  title: string; // The title of the book
  author: string; // The author of the book
  price: number; // The price of the book
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';
  description: string; // A brief description of the book
  quantity: number; // Quantity of the book available
  inStock: boolean; // Indicates if the book is in stock
}
