import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
    validator: (value) => value !== "" && value !== undefined,
    message: ({ path }) => `O campo ${path} é obrigatório.`,
});
