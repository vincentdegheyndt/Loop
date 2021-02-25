const mongoose = require('mongoose');
const {Schema} = mongoose
//mongoose veut savoir toutes les propriétés qu'une collectuion aura donc schema

const recipientSchema = new Schema({
    email:String,
    responded:{type:Boolean, default:false}
})

module.exports = recipientSchema;