const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    message : {
        type : String,
        required : true
    },
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
},{
    timestamps : true
})
let Msg = mongoose.model('message',messageSchema)
module.exports = Msg