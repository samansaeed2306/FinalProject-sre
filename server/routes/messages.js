const { addMessage, getMessages,deleteMessage,getMessagesWithIds } = require("../controllers/messageController");
const router = require("express").Router();


//New Feature
router.delete("/deletemsg/:messageId", deleteMessage);
router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.get("/messagesWithIds", getMessagesWithIds);
module.exports = router;
