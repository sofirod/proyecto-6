const connectDB = require('./src/config/db');
const express = require('express');
const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');

dotenv.config();
const app = express();

app.use(express.json()); 
 app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`));