const { Schema, model } = requrie('mongoose');

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
            //getter to formart timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [rectionSchema],
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

const Thought = model('thought', thoughtSchema);

module.exports = Thought;