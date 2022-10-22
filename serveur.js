const express=require('express');
const cors =require('cors');
const userRoute=require('./routes/userRoute');
const bodyParser=require('body-parser');
const { Socket } = require('socket.io');
const Message = require('./models/messagemodel');
const User = require('./models/usermodel');
const chatRoute = require('./routes/chatRoute');
const messageRoute=require('./routes/messageRoute');

const app=express();
const rooms=['general'];
const port=5500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(express.json())

app.use('/users', userRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);
// app.use('/login',userRoute);

app.get('/',(req,rest)=>{
    rest.json(rooms);
})


const server=require('http').createServer(app);

const io=require('socket.io')(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:["GET","POST"]
    }
})

function sortRoomMessagesByDate(message) {
    return message.sort(function(a,b){
        let date1=a._id.split('/');
        let date2=b._id.split('/');
      
        date1=date1[2]+date1[1]+ date1[0];
        date2=date2[2] +date2[1] +date2[0];

        return date1 < date2 ? -1 : 1; 
    })
}

io.on('connect',(socket)=>{
    socket.on('new-user', async ()=>{
        const members=await User.find();
        io.emit('new-member', members)
    })


socket.on('join-room', async(room)=>{
socket.join(room);
let roomMessages= await getMessageFromRoom(room);
roomMessages=sortRoomMessagesByDate(roomMessages);
socket.emit('room-messages', roomMessages);
    })
})

async function getMessageFromRoom(room) {
    let roomMessages= await Message.aggregate([
        {$match:{to: room}},
        {$group:{_id:'$date', messagesByDate:{$push:'$$ROOT'}}}
    ])
    return roomMessages;
}
// connexion à la BD
require('./bd/connexion')

server.listen(port, ()=>console.log(`serveur sur ${port}`))