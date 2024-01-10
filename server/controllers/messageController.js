const Messages = require("../models/messageModel");
const mongoose = require('mongoose');
// module.exports.getMessages = async (req, res, next) => {
//   try {
//     const { from, to } = req.body;
//     const messages = await Messages.find({
//       users: {
//         $all: [from, to],
//       },
//     }).sort({ updatedAt: 1 });
//     const projectedMessages = messages.map((msg) => {
//       return {
//         fromSelf: msg.sender.toString() === from,
//         message: msg.message.text,
//       };
//     });
//     res.json(projectedMessages);
//   } catch (ex) {
//     next(ex);
//   }
// };
// Assuming req.body contains 'from', 'to'
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: { $all: [from, to] }, // Assuming 'from' and 'to' are ObjectId references to users
    }).sort({ updatedAt: 1 });

    const formattedMessages = messages.map((msg) => ({
      messageId: msg._id,
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    }));
    res.json(formattedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    if (message === "") {
      return res.json({ msg: "Msg is Empty", status: false });
    }
   
    // Modify to create a message with _id property
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
      _id: new mongoose.Types.ObjectId(), // Generate a new unique ID
    });
   
    if (data) return res.json({ msg: "Message added successfully." });
    return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

// module.exports.addMessage = async (req, res, next) => {
//   try {
//     const { from, to, message } = req.body;
//     if(message==""){
//       return res.json({ msg: "Msg is Empty", status: false });
//     }
//     //creating message data and storing it in the messages
//     const data = await Messages.create({
//       message: { text: message },
//       users: [from, to],
//       sender: from,
//     });
//     //removed else statement
//     if (data) return res.json({ msg: "Message added successfully." });
//     return res.json({ msg: "Failed to add message to the database" });
//   } catch (ex) {
//     next(ex);
//   }
// };
//New Feature
module.exports.deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
   
    // Find the message by its ID and remove it
    const deletedMessage = await Messages.findByIdAndRemove(messageId);
   
    if (!deletedMessage) {
      return res.json({ msg: 'Message not found', status: false });
    }
   
    return res.json({ msg: 'Message deleted successfully', status: true });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getMessagesWithIds = async (req, res, next) => {
  try {
    const messagesWithIds = await Messages.find({}, { _id: 1, message: 1 });
   
    const formattedMessages = messagesWithIds.map((message) => ({
      messageId: message._id,
      text: message.message.text,
    }));
   
    res.json(formattedMessages);
  } catch (ex) {
    next(ex);
  }
};