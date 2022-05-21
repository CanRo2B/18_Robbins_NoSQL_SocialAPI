// Require packages
const { Schema, Types } = require("mongoose");
// const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateformat");

// Create new schema that will have table columns and export 
const reactionSchema = new Schema(
{
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    // Username was not in startup
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
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
// const Reaction = model("Reaction", reactionSchema);

// Reference the reaction schema
module.exports = reactionSchema;