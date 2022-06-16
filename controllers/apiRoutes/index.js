const router = require('express').Router();

const userRoutes = require('./user-routes');
const vaccinationRoutes = require('./vaccination-routes');


router.use('/users', userRoutes);
router.use('/vaccination', vaccinationRoutes);

module.exports = router;