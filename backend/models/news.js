const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  author: String,
  img: {
    type: Buffer,
    required: true,
    contentType: String,
  },
  imgUrl: String,
  content: String,
  category: String,
  date: {
    type: Date,
    required: true,
  },
});

const NewsModel = mongoose.model('NewsModel', newsSchema);
const newTestCollection = mongoose.model('NewsModel', newsSchema, 'newTest');

newsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = { NewsModel, newTestCollection };
