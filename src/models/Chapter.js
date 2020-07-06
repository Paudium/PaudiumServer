import mongoose from "mongoose";

export const Chapter = mongoose.model("Chapter", {
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
