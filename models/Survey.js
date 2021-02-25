const mongoose = require('mongoose');
const {Schema} = mongoose
const recipientSchema =require('./Recipient')
//mongoose veut savoir toutes les propriétés qu'une collectuion aura donc schema

const surveySchema = new Schema({
    title:String,
    body:String,
    subject:String,
    recipients:[recipientSchema],
    yes:{type:Number, default:0},
    no:{type:Number, default:0},
    total:Number,
    //reference
    //le _ est une convention pour indiquer que c'est une ref/jonture
    //purement sémantique
    _user:{type:Schema.Types.ObjectId, ref:'User'},
    dateSent:Date,
    lastResponded:Date,
    deleted:{type:Boolean, default:false}
})

//create surveys collection via the survey schema
mongoose.model('surveys', surveySchema)