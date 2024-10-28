import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose.connect(
            `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@cluster0.kxeto.mongodb.net/livraria?`
        );
let db = mongoose.connection;

export default db;
