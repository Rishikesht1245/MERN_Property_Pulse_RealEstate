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
    });

    res.status(200).json(conversations);
  } catch (error) {
    console.log("error in get all conversations : ", error);
    next(error);
  }
};
