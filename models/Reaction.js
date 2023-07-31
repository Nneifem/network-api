const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formateDate,
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

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

module.exports = reactionSchema;