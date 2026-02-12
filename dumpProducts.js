import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Product from './models/Product.js';

dotenv.config();

const dumpProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const products = await Product.find({});
        fs.writeFileSync('products_dump.json', JSON.stringify(products, null, 2));
        console.log(`Dumped ${products.length} products to products_dump.json`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

dumpProducts();
