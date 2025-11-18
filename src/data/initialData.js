
import strawberryBlossomLatteImage from '../assets/strawberry-blossom-latte.png'; 
import strawberrySwissRollImage from '../assets/strawberry-swiss-roll.png';
import strawberryShortcakeSliceImage from '../assets/strawberry-shortcake-slice.png';
import strawberryMilkDelightImage from '../assets/strawberry-milk-delight.png';
import strawberrySoufflePancakeImage from '../assets/strawberry-souffle-pancake.png';

export const initialCustomers = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', phone: '081234567890' },
  { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', phone: '082345678901' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', phone: '083456789012' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', phone: '084567890123' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan.h@example.com', phone: '085678901234' },
];

export const initialMenu = [
  { 
    id: 1, 
    name: 'Strawberry Blossom Latte', 
    category: 'Drink', 
    price: 'Rp 38.000', 
    stock: 20, 
    description: '(Minuman hangat dengan busa lembut, topping bunga kering & meringue pink).', 
    image: strawberryBlossomLatteImage 
  },
  { 
    id: 2, 
    name: 'Strawberry Swiss Roll', 
    category: 'Dessert', 
    price: 'Rp 35.000', 
    stock: 15, 
    description: '(Roti gulung lembut dengan krim stroberi manis dan selai segar).', 
    image: strawberrySwissRollImage 
  },
  { 
    id: 3, 
    name: 'Strawberry Shortcake Slice', 
    category: 'Dessert', 
    price: 'Rp 40.000', 
    stock: 18, 
    description: '(Potongan kue lapis stroberi dengan whipped cream & potongan buah).', 
    image: strawberryShortcakeSliceImage 
  },
  { 
    id: 4, 
    name: 'Strawberry Milk Delight', 
    category: 'Drink', 
    price: 'Rp 32.000', 
    stock: 25, 
    description: '(Susu segar dengan lapisan krim stroberi kocok & topping stroberi utuh).', 
    image: strawberryMilkDelightImage 
  },
  { 
    id: 5, 
    name: 'Strawberry Soufflé Pancake', 
    category: 'Pancake', 
    price: 'Rp 45.000', 
    stock: 12, 
    description: '(Pancake tebal dan lembut dengan siraman saus stroberi creamy dan buah segar).', 
    image: strawberrySoufflePancakeImage 
  },
];

export const initialTransactions = [
  { id: 1, customerName: 'Alice Johnson', total: 'Rp 63.000', date: '2025-09-01' },
  { id: 2, customerName: 'Charlie Brown', total: 'Rp 35.000', date: '2025-09-02' },
  { id: 3, customerName: 'Fiona Gallagher', total: 'Rp 28.000', date: '2025-09-02' },
  { id: 4, customerName: 'Bob Williams', total: 'Rp 50.000', date: '2025-09-03' },
  { id: 5, customerName: 'Alice Johnson', total: 'Rp 100.000', date: '2025-09-03' },
];