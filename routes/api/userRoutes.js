const router = require('express').Router();
const { User } = require('../../models')


// CREATE new user at /api/users
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET all users at api/users
router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.find()
            .select("-__v")
            .sort({ _id: -1 })
            .populate('thoughts')
            .populate('friends');
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET one user by ID at api/users/:id
router.get('/:userId', async (req, res) => {
    try {
        const dbUserData = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts');
        if (!dbUserData) {
            return res.status(404).json({ message: "Invalid user ID!" })
        }
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(500).json(err)
    }
});

// UPDATE user by ID at api/users/:id
router.put('/:userId', async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.params.userId }, 
            {$set: req.body}, 
            {new: true, runValidators: true})            
        if (!dbUserData) {
            return res.status(404).json({ message: "Invalid user ID!" })
        }
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(500).json(err)
    }
});


// DELETE user by ID at api/users/:id
router.delete('/:userId', async (req, res) => {
    try {
        const dbUserData = await User.findOneAndDelete({ _id: req.params.userId })          
        if (!dbUserData) {
            return res.status(404).json({ message: "Invalid user ID!" })
        }
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(500).json(err)
    }
});


// ADD FRIEND to user's friend list at api/:userId/friends/:friendId
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.params.userId }, 
            {$addToSet: { friends: req.params.friendId}}, 
            {new: true}
        )
        .populate('friends')
        .select('-__v');
        if (!dbUserData) {
            return res.status(404).json({ message: "Invalid user ID!" })
        }
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(500).json(err)
    }
});



// DELETE FRIEND from user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const dbUserData = await User.findOneAndDelete(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId}},
            { new: true }
        );
        if (!dbUserData) {
            return res.status(404).json({ message: "Invalid user ID!" })
        }
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(500).json(err)
    }
});




module.exports = router;