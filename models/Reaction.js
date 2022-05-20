// Require packages
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateformat");

// Create new schema that will have table columns and export 
const thoughtSchema = new Schema(
{
    thoughtPost: {

    },
    createdAt: {
        get: timestamp => dateFormat(timestamp)
    },
},
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)
// Create a model
const Thought = model("Thought", thoughtSchema);

// Reference the reaction schema
module.exports = Thought;