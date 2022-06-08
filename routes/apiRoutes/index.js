const router = require('express').Router();

const userRoutes = require('./user-routes');
const vaccinationRoutes = require('./vaccination-routes');

router.use('/users', userRoutes);
router.use('/posts', vaccinationRoutes);

module.exports = router;