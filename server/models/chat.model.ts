import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  messageText: {
    encryptedData: {
      type: String,
    },
    iv: {
      type: String,
    },
  },
  author: {
    type: String
  },
  messageType: {
    type: String,
    required: true,
  },
  mediaSrc: [Schema.Types.Mixed] // mediaSrc can also hold the information for a gallery, images and videos etc.
});

const chatSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
  conversations: [messageSchema],
});

const Chat = mongoose.model('Chat', chatSchema);
chatSchema.plugin(mongooseUniqueValidator);

export default Chat
