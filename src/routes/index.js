const router = require('express').Router();
const healthRoutes = require('./healthRoutes');
const mailRoutes = require('./mailRoutes');


router.use('/health', healthRoutes);
router.use('/mail', mailRoutes)

module.exports = router;