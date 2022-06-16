const router = require('express').Router();
const { User, Vaccination } = require('../../models');

//gets all users
router.get('/', (req, res) => {
    //Access our User model and .findAll method 
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//gets a single user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Vaccination,
                attributes: ['id', 'pet_name', 'pet_species', 'vaccination_date', 'created_at']
            },
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//creates a user
router.post('/', (req, res) => {
    //expects {username, email, password}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

    //login route
    router.post('/login', (req, res) => {
        // expects {email, password}
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user with that email address!' });
                return;
            }

            const validPassword = dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        });
    });

    //logout 
    router.post('/logout', (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    });

    // updates user information
    router.put('/:id', (req, res) => {
        //expects {username, email, password}

        //if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
        User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
            .then(dbUserData => {
                if (!dbUserData[0]) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });

    //deletes a user
    router.delete('/:id', (req, res) => {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });

    module.exports = router;