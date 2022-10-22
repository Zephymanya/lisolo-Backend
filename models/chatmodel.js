const mongoose=require('mongoose');

const chatSchema=mongoose.Schema({
  
    membres:{
        type:Array,
    },
},
{
    timestamps:true
}
)
const ChatModel=mongoose.model('Chat', chatSchema);
module.exports= ChatModel;