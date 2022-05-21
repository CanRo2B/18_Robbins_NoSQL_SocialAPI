// Require packages
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateformat");

// Create new schema that will have table columns and export 
const thoughtSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: "Please leave a thought",
        minlength: 1,
        maxlength: 280

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    // username and reactions was not included in Veronica's startup
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)
// Returning thoughts reactions array on query
thoughtSchema.virtual("reactionCount").get(function() {
    return this.reaction.length;
});

// Create a model
const Thought = model("Thought", thoughtSchema);

// Reference the reaction schema
module.exports = Thought;