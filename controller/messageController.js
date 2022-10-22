const Messagemodel=require('../models/messagemodel');


const ajoutMessage= async(req,res)=>{
const {chatId,senderId,text}=req.body;
const message=new Messagemodel({
chatId,
senderId,
text
})
try {
    const result=await message.save();
    res.status(200).json(result);
    console.log(result);
} catch (error) {
    req.status(500).json(error);
}
}



 const getMessage= async (req,res)=>{
    const {chatId}=req.params;
    try {
        const result= await Messagemodel.find({chatId});
        res.status(200).json(result)
        console.log(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports={
    ajoutMessage,
    getMessage
}