import mongoose from "mongoose";

const Fighter = new mongoose.Schema({
    name: {type: String,required: true},
    age: {type: Number,required: true},
    category: {type: String,required: true},
    weight: {type: String}
})

export default mongoose.model('Fighter',Fighter)