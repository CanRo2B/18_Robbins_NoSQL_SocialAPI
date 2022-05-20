const { User, Thought } = require("../models");

const userController = {
// Create CRUD Commands

// get All users
    getUsers(req, res) {
        User.find()
        .select("-_v")
        .then((dbUserData) => {
            res.json(dbUserData);
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
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({ message: "No user with this id"});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Create a new user
    createUser(req,res) {
        User.create(req.body)
        .then((dbUserData) => {
            
        })
    }

// Update User

// Delete the User

}

module.exports = userController;