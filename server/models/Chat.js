const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const chatSchema = new Schema({
  message: Array,
  owner: String,
  speaker: String,
  product: String,
  imgChat: {type:String,default:"file:///Users/rafaelarrietagarcia/Library/Developer/CoreSimulator/Devices/11A9818D-3F16-4198-80C6-9A6EED2154AB/data/Containers/Data/Application/E63D6FD0-706D-46B3-8375-9555891D006D/Library/Caches/ExponentExperienceData/%2540ravebolognesa%252Fbutler-front/ImagePicker/A161ADB1-8462-4689-94D3-3A5159AA360C.jpg"},
  // owner: { type: Schema.Types.ObjectId, ref: 'Users' },
  // speaker: { type: Schema.Types.ObjectId, ref: 'Users' },
  // product: { type: Schema.Types.ObjectId, ref: 'Products' },
  title: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
