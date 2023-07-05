const express = require('express')
const app = express()
const server = require('http').createServer(app)
const env = require('dotenv').config()
const io = require('socket.io')(server)

//Models 
const Msg = require('./Models/messagesModel')
const User = require('./Models/userModel')

//Mongodb Connection
const db = require('./config/MongodbConnection')
const user = require('./Models/userModel')
//Redis Connection
// const client = require('./config/RedisConnection')

//Port
const port = process.env.PORT || 3030

//Ejs Setup
app.set('view engine','ejs')
app.use(express.static('public'))

//Routes
app.use('/',require('./Routes/index'))


//Scoket.io Setup 
io.on('connection', (socket) => {


    //Creating New User Event
    socket.on('newuser',(username) => {
        socket.broadcast.emit('update',`${username} joined the conversation`)
        var user = {username : username}
        let data =  User.create(user,(err,newUser) => {
            if (err) {
                console.error(err);
            }else{
                console.log(`New user created with ID ${newUser._id}`);
                socket.user = newUser._id;
                
            }
        })
        
    })

    
    //User Chat Event 
    socket.on('chat', (message) => {
        
        const senderId = socket.user;
        // Create a new message object with the sender and receiver _id's
        const newMessage = {
                message: message.text,
                senderId: senderId,
            };
            // Save the new message to the database
            Msg.create(newMessage, (err, savedMessage) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`New message created with ID ${savedMessage._id}`);
                    
                    // emit the message to all connected clients
                    socket.broadcast.emit('chat', message);
                }
            });
        });
        
        
        //Exit User Event
        socket.on('exituser',(username) => {
            socket.broadcast.emit('update',`${username} left the conversation`)
        })
})


//Server Listening
server.listen(port, () => console.log(`Server Start On http://localhost:${port}`))