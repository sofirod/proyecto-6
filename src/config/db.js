const mongoose = require ("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI, {
        UseNewUrlParser: true,
        UseUnifiedTopology: true,   
    });
    console.log("base de datos conectada");
}catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); 
}}
module.exports = connectDB;