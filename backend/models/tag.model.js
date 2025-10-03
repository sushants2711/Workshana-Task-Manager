import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    } // Tag names must be unique
});

export default mongoose.model("Tag", tagSchema);