const { application } = require("express");
const { Thought, User } = require("../models");

// Create CRUD 
const thoughtController = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .select("_v")
        .then((dbthoughtData) => {
            res.json(dbthoughtData);
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
        .then((dbthoughtData) => {
            if(!dbthoughtData) {
                return res.status(404).json({ message: "No thoughts"});
            }
            res.json(dbthoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((dbthoughtData) =>{
            
        })
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
        .then((thought) => 
        !thought    
            ? res.status(404).json({ message: "no thought found"})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId})
        .then((thought) => 
        !thought 
        ? res.status(404).json({ message: "No known thought"})
            : User.findOneAndUpdate(
                { thought: req.params.thoughtId },
                { $pull: { thought: req.params.thoughtId }},
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
        .then((application) => 
        !application
            ? res.status(404).json({ message: "No thought with this id"})
            : res. json(thought)
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
        .then((thought) => 
        !application    
            ? res.status(404).json({ message: "No thought with this reaction"})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

};

module.export = thoughtController;
