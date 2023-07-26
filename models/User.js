const { Schema, model } = requrie('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                },
                message: props => `${props.value} is not a valid email address`
            },
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
    return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;