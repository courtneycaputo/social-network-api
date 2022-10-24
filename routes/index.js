const router = require('express').Router();
//const apiRoutes

router.use((req,res) => {
    return res.send("Wrong route");
})

module.exports = router;