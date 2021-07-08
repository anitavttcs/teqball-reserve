const Group = require("../models/Group");
const User = require("../models/User");

const mapTo_id = (groups) => groups.map((group) => group._id);

module.exports = {
  async createGroup(req, res) {
    const { name } = req.body;
    const { google } = req.token;

    const user = await User.findOne({ googleId: google });

    const newGroup = await new Group({
      name,
      admins: [user],
    }).save();

    res.status(201).json(newGroup);
  },

  async getGroups(req, res) {
    const { google } = req.token;

    const user = await User.findOne({ googleId: google });

    const groups = await Group.find({ admins: user });

    res.json(groups);
  },

  async getGroup(req, res) {
    const { admin, member } = req.token;

    const { id } = req.params;

    const hasPermission = () => {
      const adminIds = mapTo_id(admin);
      const memberIds = mapTo_id(member);
      return adminIds.includes(id) || memberIds.includes(id);
    };

    if (!hasPermission()) {
      return res
        .status(401)
        .json({ message: "User is not a member of this group!" });
    }

    const group = await Group.findOne({ _id: id })
      .populate("events")
      .populate("admins")
      .populate("members")
      .exec();

    if (group) {
      res.json(group);
    } else {
      res.status(404).json({ message: "Group not found!" });
    }
  },

  async addMember(req, res) {
    const { admin } = req.token;
    const { email } = req.body;
    const { id } = req.params;

    const hasPermission = () => {
      const adminIds = mapTo_id(admin);
      return adminIds.includes(id);
    };

    if (!hasPermission()) {
      return res
        .status(401)
        .json({ message: "User doesn't have admin permission in this group!" });
    }

    const invitedUser = await User.findOne({ email });

    if (!invitedUser) {
      return res
        .status(404)
        .json({ message: "Invited user is not in database!" });
    }

    // TODO: could check if already in the group
    Group.updateOne(
      { _id: id },
      { $push: { members: invitedUser } },
      (err, doc) => {
        if (err) {
          throw err;
        } else {
          res.json(doc);
        }
      }
    );
  },

  async deleteGroup(req, res) {
    const { id } = req.params;

    const { admin } = req.token;

    const hasPermission = () => {
      const adminIds = mapTo_id(admin);
      return adminIds.includes(id);
    };

    if (!hasPermission()) {
      return res
        .status(401)
        .json({ message: "User doesn't have admin permission in this group!" });
    }

    await Group.deleteOne({ _id: id });

    res.json({ message: "Group deleted!" });
  },

  async removeMember(req, res) {
    const { email } = req.body;
    const { id } = req.params;

    const { admin } = req.token;

    const hasPermission = () => {
      const adminIds = mapTo_id(admin);
      return adminIds.includes(id);
    };

    if (!hasPermission()) {
      return res
        .status(401)
        .json({ message: "User doesn't have admin permission in this group!" });
    }

    const toBeRemovedUser = await User.findOne({ email });

    Group.updateOne(
      { _id: id },
      { $pullAll: { member: [toBeRemovedUser] } },
      (err, doc) => {
        if (err) {
          throw err;
        } else {
          res.json(doc);
        }
      }
    );
  },

  async addAdmin(req, res) {
    const { email } = req.body;
    const { id } = req.params;

    const { admin } = req.token;

    const hasPermission = () => {
      const adminIds = mapTo_id(admin);
      return adminIds.includes(id);
    };

    if (!hasPermission()) {
      return res
        .status(401)
        .json({ message: "User doesn't have admin permission in this group!" });
    }

    const promotedUser = await User.findOne({ email });

    if (!promotedUser) {
      return res
        .status(404)
        .json({ message: "Promoted user is not in database!" });
    }

    // TODO: could check if already admin
    Group.updateOne(
      { _id: id },
      { $push: { amdins: promotedUser } },
      (err, doc) => {
        if (err) {
          throw err;
        } else {
          res.json(doc);
        }
      }
    );
  },
};
