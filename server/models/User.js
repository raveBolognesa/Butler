const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    phone: String,
    card: String,
    rating: String,
    chats: Array,
    images: String,
    comments: String,
    description:String,
    imgProfile: {type:String, default:"L1VzZXJzL3JhZmFlbGFycmlldGFnYXJjaWEvTGlicmFyeS9EZXZlbG9wZXIvQ29yZVNpbXVsYXRvci9EZXZpY2VzLzExQTk4MThELTNGMTYtNDE5OC04MEM2LTlBNkVFRDIxNTRBQi9kYXRhL0NvbnRhaW5lcnMvRGF0YS9BcHBsaWNhdGlvbi9FNjNENkZEMC03MDZELTQ2QjMtODM3NS05NTU1ODkxRDAwNkQvdG1wL1JlYWN0QUJJMzJfMF8wTmF0aXZlL0FCNEEyNzRFLTM2RUItNEEwMy1CMzlDLUFBM0Q2MUFBRjQ4NS5wbmc="},
    buys:Array,
    sells:Array
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
