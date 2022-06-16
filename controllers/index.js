const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const dashboardRoutes = require('./dashboard-routes')


router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);


//route requested that doesn't exist
router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;
