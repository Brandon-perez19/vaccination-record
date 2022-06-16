const router = require("express").Router();



router.get('/', (req, res) => {
    res.render('homepage');
});

// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/');
//         return;
//     }
//     console.log(req.session);
//     res.render('login');
// });

module.exports = router;