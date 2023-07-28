const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virutals: true,
            getters: true,
            timestamps: true,
        },
    }
);

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
});

function formatDate(createdAt) {
    return createdAt;
};

const Thought = model('thought', thoughtSchema);

module.exports = Thought;