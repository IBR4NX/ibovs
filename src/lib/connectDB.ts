'use server';

import mongoose from 'mongoose';
import { DB_URL } from './envConfig';

if (!DB_URL) {
    throw new Error('Please define MONGODB_URI');
}

export async function connectDB() {
    console.log('Connecting to MongoDB...');

    const connection = await mongoose.connect(DB_URL as string);

    return connection;
}
// let cached = (global as any).mongoose;

// if (!cached) {
// cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export async function connectDB() {
// console.log("createConnection DB mongoose");
// if (cached.conn) return cached.conn;

// if (!cached.promise) {
// cached.promise = mongoose.connect(DB_URL as string).then((mongoose) => mongoose);
// }

// cached.conn = await cached.promise;
// return cached.conn;
// }
//export const connDB=mongoose.createConnection('mongodb://127.0.0.1:27017/' as string);

// /hexport async function connectDB() {
// const connect = await mongoose.connect('mongodb://127.0.0.1:27017/test');
// console.log("ssss",connect);
//return true;
//}