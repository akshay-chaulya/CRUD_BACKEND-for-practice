import mongoose, { Schema } from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String},
    user: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

export default mongoose.model('Note', noteSchema);