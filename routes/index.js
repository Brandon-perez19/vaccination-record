const router = require('express').Router();
const apiRoutes = require('./apiRoutes/vaccination');
const userRoutes = require('./userRoutes/user-routes');

router.use('/api', apiRoutes);
router.use('/user', userRoutes);

//route requested that doesn't exist
router.use((req, res) => {
    res.status(404).end();
})
