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
    }

    // update a thought

    // delete a thought

    // Add reaction to thought

    // remove reaction from thought

}

module.export = thoughtController;
