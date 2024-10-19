import mongoose from "mongoose";

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@cluster0.kxeto.mongodb.net/livraria?retryWrites=true&w=majority&appName=Cluster0`
);

let db = mongoose.connection;

export default db;
