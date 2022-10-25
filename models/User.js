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
      // refers to thought document model
      ref: 'thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      // refers to user document model
      ref: 'user'
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
