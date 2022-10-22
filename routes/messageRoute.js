const express=require('express');
const {ajoutMessage,getMessage}=require('../controller/messageController');
const router=express.Router();
 
router.post('/', ajoutMessage);
router.get('/:chatId', getMessage);

module.exports = router;