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
router.get('/:thoughtId', async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
        if (!dbThoughtData) {
            return res.status(404).json({ message: "Invalid thought ID!" })
        }
        res.status(200).json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err)
    }
});

// UPDATE thought by ID at api/thoughts/:id
router.put('/:thoughtId', async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            {$set: req.body}, 
            {new: true, runValidators: true})            
        if (!dbThoughtData) {
            return res.status(404).json({ message: "Invalid thought ID!" })
        }
        res.status(200).json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err)
    }
});

// DELETE thoughts by ID at api/thoughts/:id
router.delete('/:thoughtId', async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId })          
        if (!dbThoughtData) {
            return res.status(404).json({ message: "Invalid thought ID!" })
        }
        res.status(200).json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err)
    }
});

// ADD REACTION to thought
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const dbReactionData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            {$addToSet: { reactions: req.body}}, 
            {new: true}
        )
        .populate('reactions')
        .select('-__v');
        if (!dbReactionData) {
            return res.status(404).json({ message: "Invalid thought ID!" })
        }
        res.status(200).json(dbReactionData);
    } catch (err) {
        res.status(500).json(err)
    }
});

// DELETE REACTION to thought
router.delete('/:thoughtId/reactions', async (req, res) => {
    try {
        const dbReactionData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            {$pull: { reactions: req.body}}, 
            {new: true}
        )
        .populate('reactions')
        .select('-__v');
        if (!dbReactionData) {
            return res.status(404).json({ message: "Invalid thought ID!" })
        }
        res.status(200).json(dbReactionData);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;