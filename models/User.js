const { Schema, model } = requrie('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            //unique
            required: true,
            //trimmed
        },
        
    }
);