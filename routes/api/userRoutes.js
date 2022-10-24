const router = require('express').Router();
const { User } = require('../../models')

//api/users
router.get('/', (req,res) => {
    //User.find().select("-__v")
    //     .then(async (students) => {
    //     const studentObj = {
    //     students,
    //     headCount: await headCount(),
    //   };
    //   return res.json(studentObj);
    // })
    // .catch((err) => {
    //   console.log(err);
    //   return res.status(500).json(err);
    // });

})

router.post('/', (req, res) => {
    User.create(req.body).then((dbUserData) => {
        res.json(dbUserData)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    })

})


module.exports = router;