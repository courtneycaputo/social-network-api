const router = require('express').Router();
const { Thought, User } = require('../../models')

// CREATE thought at /api/thoughts
router.post('/', async (req, res) => {
    try {
        const dbThoughtData = await Thought.create(req.body);
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
        );
        if (!dbUserData) {
            return res.status(404).json({ message: "Thought created but invalid user ID!" })
        }
        res.status(200).json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL thoughts at /api/thoughts
router.get('/', async (req, res) => {
    try {
        const dbThoughtData = await Thought.find()
            .sort({ createdAt: -1 })
            .select('-__v');
        res.status(200).json(dbThoughtData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET one thought by ID at api/thoughts/:id

// UPDATE thought by ID at api/thoughts/:id


// DELETE thoughts by ID at api/thoughts/:id


// ADD REACTION to thought


// DELETE REACTION to thought

module.exports = router;