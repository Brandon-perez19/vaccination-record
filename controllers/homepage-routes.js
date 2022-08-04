const router = require("express").Router();

router.get('/', (req, res) => {
    res.render('homepage', {
        //needed to be passed in to validate if user is loggedIn.
        //This passes loggedin value to handlebars allowing conditional rendering.
        loggedIn: req.session.loggedIn
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    console.log(req.session);
    res.render('login');
});

module.exports = router;