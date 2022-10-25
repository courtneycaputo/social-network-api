const router = require('express').Router();
const { Thought, User } = require('../../models')
 
// //api/thoughts
// router.get('/', (req,res) => {


// })

// router.post('/', async (req, res) => {
//     try{
//         const dbThoughtData = await Thought.create(req.body);
//         res.status(200).json(dbThoughtData);
//     } catch(err) {
//         res.status(500).json(err)
//     }
// })


module.exports = router;