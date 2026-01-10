


const {Schema, model} = require("mongoose")


const saved =  new Schema({
    saved: {
        type: Boolean,
        required: true
    },
    car_id: {
        type: Schema.ObjectId,
        ref: "car",
        required: true
    },
     user_id: {
        type: Schema.ObjectId,
        ref: "Auth",
        required: true
    }
},
{
    versionKey: false,
    timestamps: true
})

const SavedSchema = model("saved", saved)

module.exports = SavedSchema


