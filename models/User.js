const { Schema, model } = requrie('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            //unique
            required: true,
            //trimmed
        },
        email: {
            type: String,
            required: true,
            //unique
            // validate email address
        },
        thoughts: [
            {
                type: Schema.type.ObjectId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: Schema.type.ObjectId,
                ref: "User"
            }
        ],
    },
    {
        toJSON: {
            virutals: true,
            getters: true,
        },
    }
);

userSchema.virtual("friendCount").get(function(){
    return this.friend.length
});

const User = model('user', userSchema);

module.exports = User;