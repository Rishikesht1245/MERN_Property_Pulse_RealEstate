import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      required: [true, "Members is required"],
    },
    listing: {
      type: mongoose.Types.ObjectId,
      required: [true, "Listing reference is required."],
      ref: "Listing",
    },
  },
  { timestamps: true }
);

const Conversations = mongoose.model("Conversation", ConversationSchema);
export default Conversations;
