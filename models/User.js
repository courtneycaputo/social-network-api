const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must be a valid email address!"]
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// create virtuals friend count
userSchema.virtual("friendCount").get(function() {
  return this.friends.length;
})

// Initialize User model
const User = model('user', userSchema);

// Export model
module.exports = User;
