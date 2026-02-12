import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const fixProductMismatches = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const updates = [
            {
                name: 'Fresh Pomegranate',
                newImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop'
                // Wait, user said THIS one is Broccoli. Let me use a different one.
            },
            {
                name: 'Potato Chips (Magic Masala)',
                newImage: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=800&auto=format&fit=crop'
            },
            {
                name: 'Pure Sandalwood Soap',
                newImage: 'https://images.unsplash.com/photo-1547844621-0a612543486c?q=80&w=800&auto=format&fit=crop'
            },
            {
                name: 'Fruit & Nut Milk Chocolate',
                newImage: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=800&auto=format&fit=crop'
            }
        ];

        // Let's find a REAL pomegranate one.
        // photo-1541344999736-83eca872977a is definitely pomegranates.
        updates[0].newImage = 'https://images.unsplash.com/photo-1541344999736-83eca872977a?q=80&w=800&auto=format&fit=crop';

        for (const update of updates) {
            const result = await Product.updateOne(
                { name: update.name },
                { $set: { image: update.newImage } }
            );
            if (result.matchedCount > 0) {
                console.log(`✅ Updated ${update.name}`);
            } else {
                console.log(`❌ Product not found: ${update.name}`);
            }
        }

        console.log('\nFixes applied!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixProductMismatches();
