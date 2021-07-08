const Event = require("../models/Event");
const Group = require("../models/Group");
const User = require("../models/User");
const writeToCalendar = require("../services/writeToCalendar");

const mapTo_id = (groups) => groups.map((group) => group._id);

module.exports = {
  async addEvent(req, res) {
    const { groupId, title, date, time, location, googleExport } = req.body;

    const { admin, id: user_id } = req.token;

    const hasPermission = () => {
      const adminIds = mapTo_id(admin);
      return adminIds.includes(groupId);
    };

    if (!hasPermission()) {
      return res
        .status(401)
        .json({ message: "User doesn't have admin permission in this group!" });
    }

    const newEvent = await new Event({
      groupId,
      title,
      date,
      time,
      location,
    }).save();

    Group.updateOne(
      { _id: groupId },
      { $push: { events: newEvent } },
      (err, doc) => {
        if (err) {
          throw err;
        } else {
          res.json(doc);
        }
      }
    );

    // ----- TODO: gugli -----
    if (googleExport) {
      console.log("gugli insert");
      writeToCalendar(user_id, title);
    }
    // -----------------------
  },

  async getUsersEvents(req, res) {
    const { google } = req.token;

    const user = await User.findOne({ googleId: google });

    const groups = await Group.find()
      .or([{ admins: user }, { members: user }])
      .populate("events")
      .exec();
    if (groups) {
      res.json(groups.map((group) => group.events).flat());
    } else {
      res.status(404).json({ message: "Group not found!" });
    }
  },

  async getEvents(req, res) {
    const { groupId } = req.params;

    // const { member } = req.token;

    // const hasPermission = () => {
    //   const memberIds = mapTo_id(member);
    //   return memberIds.includes(groupId);
    // };

    // if (!hasPermission()) {
    //   return res.status(401).json({
    //     message: "User doesn't have member permission in this group!",
    //   });
    // }

    const events = await Group.findOne({ _id: groupId })
      .select("events")
      .populate("events")
      .exec();

    if (events) {
      res.json(events);
    } else {
      res.status(404).json({ message: "Group not found!" });
    }
  },

  async getEvent(req, res) {
    const { id } = req.params;

    // const { member } = req.token;
    // console.log("member: ", member);

    const event = await Event.findOne({ _id: id })
      .populate("participants.accepted")
      .populate("participants.rejected")
      .exec();

    // console.log("event: ", event);

    // const { groupId } = event;
    // console.log("groupId: ", groupId);

    // const hasPermission = () => {
    //   const memberIds = mapTo_id(member);
    //   return memberIds.includes(`${groupId}`);
    // };

    // if (!hasPermission()) {
    //   return res.status(401).json({
    //     message: "User doesn't have member permission in this group!",
    //   });
    // }

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found!" });
    }
  },

  async modifyEvent(req, res) {
    const { id } = req.params;
    const { title, date, location } = req.body;

    // const { admin } = req.token;

    // const { groupId } = await Event.findOne({ _id: id });

    // const hasPermission = () => {
    //   const adminIds = mapTo_id(admin);
    //   return adminIds.includes(`${groupId}`);
    // };

    // if (!hasPermission()) {
    //   return res
    //     .status(401)
    //     .json({ message: "User doesn't have admin permission in this group!" });
    // }

    Event.updateOne({ _id: id }, { title, date, location }, (err, doc) => {
      if (err) {
        throw err;
      } else {
        res.json(doc);
      }
    });
  },

  async setParticipation(req, res) {
    const { google, member } = req.token;

    const { id } = req.params;

    const { participation } = req.body;

    // const { groupId } = await Event.findOne({ _id: id });

    // const hasPermission = () => {
    //   const memberIds = mapTo_id(member);
    //   return memberIds.includes(`${groupId}`);
    // };

    // console.log("member: ", member);
    // console.log("groupId:", groupId, member[0]._id, "asd");

    // if (!hasPermission()) {
    //   return res.status(401).json({
    //     message: "User doesn't have member permission in this group!",
    //   });
    // }

    const user = await User.findOne({ googleId: google });

    console.log("participant: ", user);

    const options = participation
      ? {
          $push: { "participants.accepted": user },
          $pullAll: { "participants.rejected": [user] },
        }
      : {
          $pullAll: { "participants.accepted": [user] },
          $push: { "participants.rejected": user },
        };

    Event.updateOne({ _id: id }, options, (err, doc) => {
      if (err) {
        throw err;
      } else {
        res.json(doc);
      }
    });
  },
};

// -------------------- PLS DO NOT DELETE --------------------
// module.exports = {
//   async addEvent(req, res) {
//     const { groupId, title, date, location } = req.body;

//     const newEvent = await new Event({ groupId, title, date, location }).save();

//     Group.updateOne(
//       { _id: groupId },
//       { $push: { events: newEvent } },
//       (err, doc) => {
//         if (err) {
//           throw err;
//         } else {
//           res.json(doc);
//         }
//       }
//     );
//   },

//   async getUsersEvents(req, res) {
//     const { google } = req.token;
//     // TODO: check that user has group permission

//     const user = await User.findOne({ googleId: google });

//     const groups = await Group.find()
//       .or([{ admins: user }, { members: user }])
//       .populate("events")
//       .exec();
//     if (groups) {
//       res.json(groups.map((group) => group.events).flat());
//     } else {
//       res.status(404).json({ message: "Group not found!" });
//     }
//   },

//   async getEvents(req, res) {
//     const { groupId } = req.params;

//     // TODO: check that user has group permission

//     const events = await Group.findOne({ _id: groupId })
//       .select("events")
//       .populate("events")
//       .exec();

//     if (events) {
//       res.json(events);
//     } else {
//       res.status(404).json({ message: "Group not found!" });
//     }
//   },

//   async getEvent(req, res) {
//     const { id } = req.params;

//     const event = await Event.findOne({ _id: id })
//       .populate("participants.accepted")
//       .populate("participants.rejected")
//       .exec();

//     if (event) {
//       res.json(event);
//     } else {
//       res.status(404).json({ message: "Event not found!" });
//     }
//   },

//   async modifyEvent(req, res) {
//     const { id } = req.params;
//     const { title, date, location } = req.body;

//     // TODO: check that user has admin permission

//     const newEvent = await new Event({ title, date, location }).save();

//     Event.updateOne({ _id: id }, { title, date, location }, (err, doc) => {
//       if (err) {
//         throw err;
//       } else {
//         res.json(doc);
//       }
//     });
//   },

//   async setParticipation(req, res) {
//     const { google } = req.token;

//     const { id } = req.params;

//     const { participation } = req.body;

//     const user = await User.findOne({ googleId: google });

//     console.log("participant: ", user);

//     const options = participation
//       ? {
//         $push: { "participants.accepted": user },
//         $pullAll: { "participants.rejected": [user] },
//       }
//       : {
//         $pullAll: { "participants.accepted": [user] },
//         $push: { "participants.rejected": user },
//       };

//     Event.updateOne({ _id: id }, options, (err, doc) => {
//       if (err) {
//         throw err;
//       } else {
//         res.json(doc);
//       }
//     });
//   },
// };
