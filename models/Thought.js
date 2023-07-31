const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const { create } = require('./User');

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
            get: formateDate,
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
        },
    }
);

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
});

function formateDate(createdAt) {
    const date = new Date(createdAt);
    return date.toLocaleString('en-us', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
};

const Thought = model('thought', thoughtSchema);

module.exports = Thought;