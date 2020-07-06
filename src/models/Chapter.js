const mongoose = require('mongoose');

module.exports =  mongoose.model("Chapter", {
  title: String,
  startTimeStamp: String,
  endTimeStamp: String,

  notes: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
 
});
