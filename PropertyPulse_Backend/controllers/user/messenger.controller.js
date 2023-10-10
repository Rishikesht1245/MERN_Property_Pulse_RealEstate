import Messages from "../../models/MessageModel.js";
import Conversations from "../../models/conversationModel.js";

export const createConversation = async (req, res, next) => {
  try {
    const newConversation = new Conversations({
      members: [req.body.senderId, req.body.receiverId],
      listing: req.body.listingId,
    });
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    console.log("error in Creating conversations :", error);
    next(error);
  }
};

// get all conversations of a particular user
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversations.find({
      members: { $in: [req.params.userId] },
    }).populate("listing");
    res.status(200).json(conversations);
  } catch (error) {
    console.log("error in get all conversations : ", error);
    next(error);
  }
};

// add new message
export const addMessage = async (req, res, next) => {
  console.log("reached 1");

  try {
    const newMessage = new Messages(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.log("Error in add message : ", error);
    next(error);
  }
};

// get all messages in a conversation
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Messages.find({
      conversationId: req.params.conversationId,
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in Get messages : ", error);
    next(error);
  }
};
