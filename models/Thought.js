const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Schema to create Thoughts model
const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      require: `You must leave a thought`,
      minlength: 1,
      maxlength: 280

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true

    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
}
);

// create virtuals reaction count
thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
  })
  
  // Initialize User model
  const Thought = model('thought', thoughtSchema);
  
  // Export model
  module.exports = Thought;