const { thoughts } = require("express");
const { Thought, User } = require("../models");

// Create CRUD 
const thoughtController = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .select("_v")
        .then((thoughts) => {
            res.json(thoughts);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get a single thought :id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select("-_v")
        .populate("friends")
        .populate("thoughts")
        .then((thoughts) => {
            if(!thoughts) {
                return res.status(404).json({ message: "No thoughts"});
            }
            res.json(thoughts);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thoughts) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: {thoughts: thoughts._id} },
                {new: true }
            );
        })
        then((user) => 
            !user
                ? res.status(404).json({ message: "Thought created but not known user is found"
                })
                : res.json("Thought created")
            )
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
    },

    // update a thought
    updateThought(req, res) {
        console.log("Updating a thought");
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { user: req.body } },
            {runValidators: true, new: true }
        )
        .then((thoughts) => 
        !thoughts 
            ? res.status(404).json({ message: "no thought found"})
            : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId})
        .then((thoughts) => 
        !thoughts
        ? res.status(404).json({ message: "No known thought"})
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                {new: true}
                )
            )
            .then((user) => 
                !user
                ? res.json({ message: "No user with this thought"})
                : res.json({ message: "Thought deleted"})
                )
                .catch((err) => res.status(500).json(err));
    },

    // Add reaction to thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reaction: req.body }}, 
            { runValidators: true, new: true }
        )
        .then((thoughts) => 
        !thoughts
            ? res.status(404).json({ message: "No thought with this id"})
            : res. json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },

    // remove reaction from thought
    removeReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: {reactionId: req.params.reactionId }}},
            {runValidators: true, new: true }
        )
        .then((thoughts) => 
        !thoughts    
            ? res.status(404).json({ message: "No thought with this reaction"})
            : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtController;
