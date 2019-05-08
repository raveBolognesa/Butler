const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    emiter: String,
    receptor: String,
    content: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;