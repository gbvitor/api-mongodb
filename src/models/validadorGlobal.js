import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
    validator: (value) => value !== "" || value !== undefined || value !== null,
    message: ({ path }) => `O campo ${path} é obrigatório.`,
});
