import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config({ path: 'backend/.env' });
connectDB();

const categories = [
    { name: 'Fruits & Vegetables', icon: 'Apple' },
    { name: 'Dairy & Eggs', icon: 'Milk' },
    { name: 'Beverages', icon: 'Coffee' },
    { name: 'Snacks', icon: 'Cookie' },
    { name: 'Bakery', icon: 'Bread' },
    { name: 'Personal Care', icon: 'User' },
];

const products = [
    // Fruits & Vegetables
    {
        name: 'Alphonso Mangoes',
        category: 'Fruits & Vegetables',
        price: 600,
        discount: 10,
        quantity: 50,
        unit: '1 Dozen',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Premium Ratnagiri Alphonso mangoes, known for their rich flavor and sweetness.',
        rating: 4.9,
        reviews: 240,
        isFeatured: true
    },
    {
        name: 'Red Onions',
        category: 'Fruits & Vegetables',
        price: 40,
        discount: 0,
        quantity: 500,
        unit: '1 kg',
        image: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Fresh and pungent red onions, essential for Indian cooking.',
        rating: 4.4,
        reviews: 180,
        isFeatured: false
    },
    {
        name: 'Fresh Baby Spinach',
        category: 'Fruits & Vegetables',
        price: 30,
        discount: 5,
        quantity: 100,
        unit: '250 g',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Tender baby spinach leaves, perfect for salads and smoothies.',
        rating: 4.6,
        reviews: 95,
        isFeatured: false
    },
    {
        name: 'Organic Broccoli',
        category: 'Fruits & Vegetables',
        price: 120,
        discount: 15,
        quantity: 80,
        unit: '1 pc',
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bbe?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Farm-fresh organic broccoli, high in vitamins and fiber.',
        rating: 4.7,
        reviews: 110,
        isFeatured: true
    },
    {
        name: 'Red Capsicum',
        category: 'Fruits & Vegetables',
        price: 150,
        discount: 10,
        quantity: 60,
        unit: '500 g',
        image: 'https://images.unsplash.com/photo-1563502310703-1ffe473ad66d?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Sweet and crunchy red bell peppers, great for stir-frys.',
        rating: 4.5,
        reviews: 78,
        isFeatured: false
    },
    {
        name: 'Fresh Pomegranate',
        category: 'Fruits & Vegetables',
        price: 180,
        discount: 0,
        quantity: 120,
        unit: '1 kg',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Juicy and sweet pomegranates, rich in antioxidants.',
        rating: 4.8,
        reviews: 150,
        isFeatured: true
    },
    {
        name: 'Granny Smith Apples',
        category: 'Fruits & Vegetables',
        price: 250,
        discount: 10,
        quantity: 150,
        unit: '1 kg',
        image: 'https://images.unsplash.com/photo-1610398648301-883b16fb8e1c?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Crisp and tart green apples, imported for best quality.',
        rating: 4.6,
        reviews: 130,
        isFeatured: false
    },
    {
        name: 'Potatoes (Jyoti)',
        category: 'Fruits & Vegetables',
        price: 35,
        discount: 0,
        quantity: 1000,
        unit: '1 kg',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Versatile Jyoti potatoes, perfect for mashing or frying.',
        rating: 4.3,
        reviews: 400,
        isFeatured: false
    },
    {
        name: 'Fresh Garlic',
        category: 'Fruits & Vegetables',
        price: 200,
        discount: 5,
        quantity: 200,
        unit: '250 g',
        image: 'https://images.unsplash.com/photo-1558350711-209930f40d1a?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'High-quality garlic bulbs with intense aroma.',
        rating: 4.5,
        reviews: 210,
        isFeatured: false
    },
    {
        name: 'Fresh Ginger',
        category: 'Fruits & Vegetables',
        price: 120,
        discount: 0,
        quantity: 150,
        unit: '250 g',
        image: 'https://images.unsplash.com/photo-1599940824399-b87987cb942c?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Fresh and spicy ginger root, locally sourced.',
        rating: 4.4,
        reviews: 165,
        isFeatured: false
    },

    // Dairy & Eggs
    {
        name: 'Amul Butter',
        category: 'Dairy & Eggs',
        price: 250,
        discount: 5,
        quantity: 200,
        unit: '500 g',
        image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'The classic Amul salted butter, loved by millions.',
        rating: 4.9,
        reviews: 500,
        isFeatured: true
    },
    {
        name: 'Greek Yogurt (Blueberry)',
        category: 'Dairy & Eggs',
        price: 60,
        discount: 0,
        quantity: 150,
        unit: '90 g',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Thick and creamy Greek yogurt with real blueberry pulp.',
        rating: 4.7,
        reviews: 140,
        isFeatured: false
    },
    {
        name: 'Fresh Paneer',
        category: 'Dairy & Eggs',
        price: 90,
        discount: 0,
        quantity: 300,
        unit: '200 g',
        image: 'https://images.unsplash.com/photo-15632420a3-a8c62649bd1a?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Soft and fresh cottage cheese (Paneer), made from pure milk.',
        rating: 4.8,
        reviews: 320,
        isFeatured: true
    },
    {
        name: 'Free Range Brown Eggs',
        category: 'Dairy & Eggs',
        price: 130,
        discount: 10,
        quantity: 100,
        unit: '6 pcs',
        image: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Healthy free-range brown eggs, rich in protein and Omega-3.',
        rating: 4.6,
        reviews: 210,
        isFeatured: true
    },
    {
        name: 'Cheddar Cheese Block',
        category: 'Dairy & Eggs',
        price: 350,
        discount: 5,
        quantity: 80,
        unit: '200 g',
        image: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Sharp and aged white cheddar cheese, perfect for snacks.',
        rating: 4.7,
        reviews: 85,
        isFeatured: false
    },
    {
        name: 'Fresh Buttermilk (Chaas)',
        category: 'Dairy & Eggs',
        price: 15,
        discount: 0,
        quantity: 400,
        unit: '200 ml',
        image: 'https://images.unsplash.com/photo-1542444459-bb3d94065677?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Refreshing spiced buttermilk, perfect for digestion.',
        rating: 4.5,
        reviews: 190,
        isFeatured: false
    },
    {
        name: 'Fresh Cooking Cream',
        category: 'Dairy & Eggs',
        price: 65,
        discount: 0,
        quantity: 120,
        unit: '250 ml',
        image: 'https://images.unsplash.com/photo-1574548316130-914228991de3?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Rich and smooth fresh cream for gourmet cooking.',
        rating: 4.6,
        reviews: 75,
        isFeatured: false
    },
    {
        name: 'Mozzarella Shredded Cheese',
        category: 'Dairy & Eggs',
        price: 450,
        discount: 15,
        quantity: 50,
        unit: '400 g',
        image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Perfectly melting shredded mozzarella for pizzas and pastas.',
        rating: 4.8,
        reviews: 115,
        isFeatured: true
    },
    {
        name: 'Kesar Shrikhand',
        category: 'Dairy & Eggs',
        price: 80,
        discount: 0,
        quantity: 90,
        unit: '250 g',
        image: 'https://images.unsplash.com/photo-1626202378302-311827448cc4?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Traditional sweetened yogurt dessert with saffron and cardamom.',
        rating: 4.9,
        reviews: 65,
        isFeatured: false
    },
    {
        name: 'Unsweetened Soya Milk',
        category: 'Dairy & Eggs',
        price: 140,
        discount: 10,
        quantity: 70,
        unit: '1 L',
        image: 'https://images.unsplash.com/photo-1620352723659-9943615e45a6?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Healthy plant-based milk alternative, rich in protein.',
        rating: 4.4,
        reviews: 55,
        isFeatured: false
    },

    // Beverages
    {
        name: 'Masala Tea Bags',
        category: 'Beverages',
        price: 180,
        discount: 5,
        quantity: 300,
        unit: '25 Bags',
        image: 'https://images.unsplash.com/photo-1544787210-2213d2426002?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Aromatic Indian masala chai bags with ginger, cardamom, and clove.',
        rating: 4.7,
        reviews: 145,
        isFeatured: true
    },
    {
        name: 'Honey Lemon Green Tea',
        category: 'Beverages',
        price: 220,
        discount: 10,
        quantity: 250,
        unit: '25 Bags',
        image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Soothing green tea infused with natural honey and lemon flavor.',
        rating: 4.6,
        reviews: 110,
        isFeatured: false
    },
    {
        name: 'Fresh Orange Juice',
        category: 'Beverages',
        price: 120,
        discount: 0,
        quantity: 100,
        unit: '1 L',
        image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=600&h=600&auto=format&fit=crop',
        description: '100% pure squeezed orange juice with no added sugar.',
        rating: 4.8,
        reviews: 200,
        isFeatured: true
    },
    {
        name: 'Red Bull Energy Drink',
        category: 'Beverages',
        price: 125,
        discount: 0,
        quantity: 500,
        unit: '250 ml',
        image: 'https://images.unsplash.com/photo-1622543953495-473ee167c455?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Vitalizes body and mind. High caffeine content.',
        rating: 4.4,
        reviews: 350,
        isFeatured: false
    },
    {
        name: 'Tender Coconut Water',
        category: 'Beverages',
        price: 50,
        discount: 0,
        quantity: 400,
        unit: '200 ml',
        image: 'https://images.unsplash.com/photo-1550506393-42460297c11b?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Natural and refreshing tender coconut water in a convenient pack.',
        rating: 4.9,
        reviews: 280,
        isFeatured: true
    },
    {
        name: 'Lemon Iced Tea',
        category: 'Beverages',
        price: 95,
        discount: 5,
        quantity: 180,
        unit: '500 ml',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Refreshing iced tea with a zesty lemon twist.',
        rating: 4.5,
        reviews: 125,
        isFeatured: false
    },
    {
        name: 'Hot Chocolate Mix',
        category: 'Beverages',
        price: 280,
        discount: 10,
        quantity: 120,
        unit: '200 g',
        image: 'https://images.unsplash.com/photo-1544787210-2213d2426002?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Rich and velvety hot chocolate powder for cozy evenings.',
        rating: 4.7,
        reviews: 65,
        isFeatured: false
    },
    {
        name: 'Sparkling Apple Cider',
        category: 'Beverages',
        price: 350,
        discount: 15,
        quantity: 60,
        unit: '750 ml',
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Non-alcoholic sparkling apple cider, perfect for celebrations.',
        rating: 4.8,
        reviews: 45,
        isFeatured: false
    },
    {
        name: 'Sparkling Water',
        category: 'Beverages',
        price: 80,
        discount: 0,
        quantity: 200,
        unit: '600 ml',
        image: 'https://images.unsplash.com/photo-1551731589-cee040c8d602?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Carbonated natural spring water with a crisp taste.',
        rating: 4.3,
        reviews: 80,
        isFeatured: false
    },
    {
        name: 'Gold Instant Coffee',
        category: 'Beverages',
        price: 320,
        discount: 5,
        quantity: 150,
        unit: '100 g',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Premium freeze-dried instant coffee for a rich aroma.',
        rating: 4.7,
        reviews: 190,
        isFeatured: true
    },

    // Snacks
    {
        name: 'Potato Chips (Magic Masala)',
        category: 'Snacks',
        price: 20,
        discount: 0,
        quantity: 1000,
        unit: '50 g',
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Classic crunchy potato chips with a spicy Indian masala flavor.',
        rating: 4.5,
        reviews: 800,
        isFeatured: true
    },
    {
        name: 'Roasted California Almonds',
        category: 'Snacks',
        price: 450,
        discount: 10,
        quantity: 150,
        unit: '250 g',
        image: 'https://images.unsplash.com/photo-1508048610243-9823354a71c1?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Premium roasted and lightly salted California almonds.',
        rating: 4.8,
        reviews: 210,
        isFeatured: true
    },
    {
        name: 'Cheese Nachos',
        category: 'Snacks',
        price: 90,
        discount: 5,
        quantity: 200,
        unit: '150 g',
        image: 'https://images.unsplash.com/photo-1513267048331-5611cad82e41?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Crunchy corn nachos with a savory cheese seasoning.',
        rating: 4.4,
        reviews: 135,
        isFeatured: false
    },
    {
        name: 'Caramel Popcorn',
        category: 'Snacks',
        price: 110,
        discount: 0,
        quantity: 120,
        unit: '100 g',
        image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Sweet and crunchy gourmet caramel popcorn.',
        rating: 4.6,
        reviews: 90,
        isFeatured: true
    },
    {
        name: 'Mixed Indian Namkeen',
        category: 'Snacks',
        price: 140,
        discount: 10,
        quantity: 250,
        unit: '400 g',
        image: 'https://images.unsplash.com/photo-1601050633722-356b44844bb2?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Traditional mixed savory snacks (Bhusia, Peanuts, Cornflakes).',
        rating: 4.7,
        reviews: 240,
        isFeatured: false
    },
    {
        name: 'Dark Chocolate Cookies',
        category: 'Snacks',
        price: 80,
        discount: 0,
        quantity: 180,
        unit: '150 g',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Rich dark chocolate chip cookies, baked to perfection.',
        rating: 4.5,
        reviews: 160,
        isFeatured: false
    },
    {
        name: 'Fruit & Nut Energy Bar',
        category: 'Snacks',
        price: 45,
        discount: 5,
        quantity: 300,
        unit: '40 g',
        image: 'https://images.unsplash.com/photo-1604497073496-5c5a35bd6977?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Healthy snack bar packed with dried fruits and nuts.',
        rating: 4.3,
        reviews: 185,
        isFeatured: false
    },
    {
        name: 'Crunchy Peanut Butter',
        category: 'Snacks',
        price: 220,
        discount: 10,
        quantity: 90,
        unit: '340 g',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'All-natural crunchy peanut butter with no added hydrogenated oils.',
        rating: 4.7,
        reviews: 140,
        isFeatured: false
    },
    {
        name: 'Classic Corn Flakes',
        category: 'Snacks',
        price: 190,
        discount: 5,
        quantity: 110,
        unit: '500 g',
        image: 'https://images.unsplash.com/photo-1581447100595-37ff89a71644?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Golden crunchy corn flakes, the perfect breakfast cereal.',
        rating: 4.4,
        reviews: 210,
        isFeatured: false
    },
    {
        name: 'Fruit & Nut Milk Chocolate',
        category: 'Snacks',
        price: 100,
        discount: 0,
        quantity: 250,
        unit: '90 g',
        image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Creamy milk chocolate with raisins and chopped nuts.',
        rating: 4.6,
        reviews: 290,
        isFeatured: true
    },

    // Bakery
    {
        name: 'Whole Wheat Brown Bread',
        category: 'Bakery',
        price: 50,
        discount: 0,
        quantity: 150,
        unit: '400 g',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Healthy and fresh whole wheat sandwich bread.',
        rating: 4.5,
        reviews: 320,
        isFeatured: true
    },
    {
        name: 'Multigrain Artisanal Bread',
        category: 'Bakery',
        price: 65,
        discount: 5,
        quantity: 100,
        unit: '400 g',
        image: 'https://images.unsplash.com/photo-1555951015-6da3f9b07ee7?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Nutritious bread loaded with seeds and multiple grains.',
        rating: 4.7,
        reviews: 140,
        isFeatured: false
    },
    {
        name: 'Butter Chocolate Croissant',
        category: 'Bakery',
        price: 120,
        discount: 0,
        quantity: 60,
        unit: '1 pc',
        image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Flaky and buttery French-style croissant with a chocolate filling.',
        rating: 4.8,
        reviews: 95,
        isFeatured: true
    },
    {
        name: 'Fruit & Nut Cake',
        category: 'Bakery',
        price: 250,
        discount: 10,
        quantity: 50,
        unit: '400 g',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Traditional tea-time cake loaded with candied fruits and nuts.',
        rating: 4.4,
        reviews: 80,
        isFeatured: false
    },
    {
        name: 'Garlic Breadsticks',
        category: 'Bakery',
        price: 80,
        discount: 0,
        quantity: 120,
        unit: '150 g',
        image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Crispy oven-baked breadsticks seasoned with garlic and herbs.',
        rating: 4.3,
        reviews: 65,
        isFeatured: false
    },
    {
        name: 'Baked Veg Patties',
        category: 'Bakery',
        price: 25,
        discount: 0,
        quantity: 200,
        unit: '1 pc',
        image: 'https://images.unsplash.com/photo-1601050633722-356b44844bb2?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Crispy puff pastry filled with spiced potatoes and peas.',
        rating: 4.6,
        reviews: 210,
        isFeatured: false
    },
    {
        name: 'Fresh Blueberry Muffin',
        category: 'Bakery',
        price: 95,
        discount: 5,
        quantity: 80,
        unit: '1 pc',
        image: 'https://images.unsplash.com/photo-1587538637146-8a84882c212b?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Moist and fluffy muffin bursting with fresh blueberries.',
        rating: 4.7,
        reviews: 110,
        isFeatured: false
    },
    {
        name: 'Plain Sesame Bagels',
        category: 'Bakery',
        price: 150,
        discount: 0,
        quantity: 40,
        unit: '4 pcs',
        image: 'https://images.unsplash.com/photo-1585476108011-1550a6a8ce10?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Classic boiled and baked bagels with sesame seeds.',
        rating: 4.4,
        reviews: 50,
        isFeatured: false
    },
    {
        name: 'Whole Wheat Pita Bread',
        category: 'Bakery',
        price: 70,
        discount: 0,
        quantity: 90,
        unit: '5 pcs',
        image: 'https://images.unsplash.com/photo-1559811814-e2c5c3e7454f?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Fresh pocket pita bread, perfect for hummus and falafel.',
        rating: 4.5,
        reviews: 75,
        isFeatured: false
    },
    {
        name: 'Walnut Dark Brownies',
        category: 'Bakery',
        price: 180,
        discount: 10,
        quantity: 70,
        unit: '2 pcs',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Rich fudgy brownies with toasted walnut chunks.',
        rating: 4.8,
        reviews: 130,
        isFeatured: true
    },

    // Personal Care
    {
        name: 'Pure Sandalwood Soap',
        category: 'Personal Care',
        price: 45,
        discount: 0,
        quantity: 400,
        unit: '100 g',
        image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Traditional sandalwood soap for naturally glowing skin.',
        rating: 4.7,
        reviews: 310,
        isFeatured: true
    },
    {
        name: 'Pure Aloe Vera Gel',
        category: 'Personal Care',
        price: 150,
        discount: 10,
        quantity: 150,
        unit: '150 ml',
        image: 'https://images.unsplash.com/photo-1560944527-a4a429848866?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Multi-purpose soothing gel made from organic aloe vera.',
        rating: 4.6,
        reviews: 240,
        isFeatured: false
    },
    {
        name: 'Activated Charcoal Face Wash',
        category: 'Personal Care',
        price: 220,
        discount: 15,
        quantity: 120,
        unit: '100 ml',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Deep cleansing face wash that removes dirt and pollutants.',
        rating: 4.5,
        reviews: 180,
        isFeatured: true
    },
    {
        name: 'Virgin Coconut Hair Oil',
        category: 'Personal Care',
        price: 180,
        discount: 5,
        quantity: 200,
        unit: '200 ml',
        image: 'https://images.unsplash.com/photo-1620352723659-9943615e45a6?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Pure coconut oil for deep hair conditioning and scalp health.',
        rating: 4.8,
        reviews: 420,
        isFeatured: false
    },
    {
        name: 'Deep Moisterizing Lotion',
        category: 'Personal Care',
        price: 350,
        discount: 10,
        quantity: 90,
        unit: '400 ml',
        image: 'https://images.unsplash.com/photo-1556228578-8c7c0f42155f?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Non-greasy body lotion for 24-hour hydration.',
        rating: 4.4,
        reviews: 135,
        isFeatured: false
    },
    {
        name: 'Alcohol-Based Hand Sanitizer',
        category: 'Personal Care',
        price: 60,
        discount: 0,
        quantity: 1000,
        unit: '100 ml',
        image: 'https://images.unsplash.com/photo-1584622781514-f63421227092?q=80&w=800&auto=format&fit=crop',
        description: 'Instant germ protection on the go with a fresh scent.',
        rating: 4.2,
        reviews: 900,
        isFeatured: false
    },
    {
        name: 'Herbal Fluoride-Free Toothpaste',
        category: 'Personal Care',
        price: 120,
        discount: 5,
        quantity: 250,
        unit: '150 g',
        image: 'https://images.unsplash.com/photo-1522335789183-b153e30e666a?q=80&w=800&auto=format&fit=crop',
        description: 'Natural toothpaste with clove and neem for total oral care.',
        rating: 4.6,
        reviews: 155,
        isFeatured: false
    },
    {
        name: 'Eco-Friendly Bamboo Toothbrush',
        category: 'Personal Care',
        price: 90,
        discount: 10,
        quantity: 300,
        unit: '1 pc',
        image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Biodegradable bamboo toothbrush with soft charcoal bristles.',
        rating: 4.7,
        reviews: 210,
        isFeatured: false
    },
    {
        name: 'Sunscreen Gel SPF 50',
        category: 'Personal Care',
        price: 450,
        discount: 10,
        quantity: 60,
        unit: '50 ml',
        image: 'https://plus.unsplash.com/premium_photo-1679062319020-f1d2e1329aee?q=80&w=800&auto=format&fit=crop',
        description: 'Matte-finish sunscreen with broad-spectrum UVA/UVB protection.',
        rating: 4.6,
        reviews: 85,
        isFeatured: true
    },
    {
        name: 'Anti-Dandruff Shampoo',
        category: 'Personal Care',
        price: 280,
        discount: 10,
        quantity: 140,
        unit: '200 ml',
        image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&h=600&auto=format&fit=crop',
        description: 'Effective formula to control dandruff and scalp itching.',
        rating: 4.5,
        reviews: 195,
        isFeatured: false
    }
];

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: 'password123',
        phone: '9876543210',
        role: 'admin'
    },
    {
        name: 'Puneet Kushwaha',
        email: 'puneetkushwaha9452@gmail.com',
        password: 'password123',
        phone: '9452000000',
        role: 'customer',
        address: {
            street: '123 Civil Lines',
            city: 'Lucknow',
            state: 'Uttar Pradesh',
            zip: '226001'
        }
    }
];

const importData = async () => {
    try {
        await User.deleteMany();
        await Category.deleteMany();
        await Product.deleteMany();

        await User.create(users);
        await Category.insertMany(categories);
        await Product.insertMany(products);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Category.deleteMany();
        await Product.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
