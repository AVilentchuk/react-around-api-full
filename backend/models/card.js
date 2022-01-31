const mongoose = require('mongoose');
const errors = require('../constants/errors');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(
          link
        );
      }
    },
    required: true
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'user',
    require: true
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

cardSchema.statics.checkIfOwner = function checkIfOwner(cardId, requestUserId) {
  return this.findOne({ _id: `${cardId}` }).then((result) => {
    if (!result) return Promise.reject(errors.cardNotFound);

    if (result.owner.valueOf() !== requestUserId) return Promise.reject(errors.notOwner);
    return result;
  });
};

module.exports = mongoose.model('card', cardSchema);
