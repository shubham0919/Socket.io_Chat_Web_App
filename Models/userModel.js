const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {
        type : String,
        redquired : true
    }
},{
    timestamps : true
})
let user = mongoose.model('user',userSchema)
module.exports = user