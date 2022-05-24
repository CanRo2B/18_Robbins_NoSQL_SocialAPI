const { User, Thought } = require("../models");

const userController = {
// Create CRUD Commands

// get All users
    getUsers(req, res) {
        User.find()
        .select("-_v")
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
// Respond with a user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select("-_v")
        .populate("friends")
        .populate("thoughts")
        .then((user) => {
            if(!user) {
                return res.status(404).json({ message: "No user with this id"});
            }
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Create a new user
    createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

// Update User
    updateUser(req, res) {
        console.log('You are updating the user');
        console.log(req.body);
        User.findOneAndUpdate(
        { _id: req.params.userId },
        { $Set: { user: req.body } },
        { runValidators: true, new: true }
        )
            .then((user) =>
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found' })
                : res.json(user)
            )
        .catch((err) => res.status(500).json(err));
    },

// Delete the User
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId})
        .then((user) => 
        !user
            ? res.status(404).json({ message: "No known User"})  
            : Thought.findOneAndUpdate(
                { user: req.params.userId },
                { $pull: { user: req.params.userId }},
                { new: true }
                )
            )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: "User deleted, no thoughts found"})
            : res.json({ message: "User deleted"})
            )
        .catch((err) => {
            console.log(err);
        res.status(500).json(err);
        });
    },

    // Add friend to user
    addFriends(req, res) {
        console.log("Adding friend to user");
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            {runValidators: true, new: true }
        )
        .then((user) => 
        !user ? res.status(404).json({ message: "No user found with that id"})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Remove friend from user
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { $in: req.params.friendId } } },
            {runValidators: true, new: true }
        )
        .then((user) => 
        !user
            ? res 
            .status(404)
            .json({ message: "No user found with that id"})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = userController;