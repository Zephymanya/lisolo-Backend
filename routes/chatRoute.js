const express =require ('express');
const {creatChat,userChats,findChat} =require('../controller/chatController.js') 

const router=express.Router();

router.post("/", creatChat);
router.get("/:userId", userChats)
router.get("/find/:firstId/:secondId", findChat)

module.exports= router;