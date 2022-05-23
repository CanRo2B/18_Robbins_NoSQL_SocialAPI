// Require packages
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

// Create new schema that will have table columns and export 
const thoughtSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280

    },
    createdAt: {
        type: Date,
        default: Date.now,
        // get: date => dateFormat(date)
        // get: timestamp => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)
// Returning thoughts reactions array on query
thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

// Create a model
const Thought = model("thought", thoughtSchema);

// Reference the reaction schema
module.exports = Thought;