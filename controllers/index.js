const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const dashboardRoutes = require('./dashboard-routes')
const homepageRoutes = require('./homepage-routes')

router.use('/', homepageRoutes)
router.use('/api', apiRoutes);
//empty, dont turn on, it will return an object
// router.use('/dashboard', dashboardRoutes);


//route requested that doesn't exist
router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;
