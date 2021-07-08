const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" }, //ez ide nem kéne, mert groupban már be vannak hivatkozva eventek
  location: { type: String, required: true },
  participants: {
    accepted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // unique: true,    //A: nem jó ide a unique, mert akkor 1 ember csak 1 eventet fogadhat el (DB indexként kezeli)
      },
    ],
    rejected: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // unique: true,    //A: uaz, mint fent
      },
    ],
  },
});

module.exports = mongoose.model("Event", eventSchema);
