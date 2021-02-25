const mongoose = require('mongoose');
const {Schema} = mongoose
//mongoose veut savoir toutes les propriétés qu'une collectuion aura donc schema

const userSchema = new Schema({
    googleId:String,
    credits: {type:Number, default:0}
})

//create users collection via the user schema
mongoose.model('users', userSchema)