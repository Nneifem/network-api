const { User, Thought } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // get one user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with this ID '});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!course) {
                res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if(!user) {
                res.status(404).json({ message: 'No user with this ID' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ messafe: 'User and thoughts are deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create friend list
    async addFreind(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with this ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }, 

    // remove friend from list
    async removeFreind(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { reaction: { reactionId: req.params.friendId } } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with this ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
};