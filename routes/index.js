const router = require('express').Router();
const apiRoutes = require('./apiRoutes');


router.use('/api', apiRoutes);


//route requested that doesn't exist
router.use((req, res) => {
    res.status(404).end();
})
