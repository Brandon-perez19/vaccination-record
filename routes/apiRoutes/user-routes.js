const router = require('express').Router();
//replace when user object is created
// const { User } = require();

//Get /api/users
router.get('/', (req, res => {
    //Access our User model and .findAll method 
    User.findAll({
        attributes: {exclude: ['password']}
    })
        .then(UserData => res.json(UserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })

}))

//creates a user
router.post('/', (req, res) => {
    //expects {username, email, password}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
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
        if(!dbUserData){
            res.status(400).json({ message: 'No user with that email address!'});
            return;
        }
        
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword){
            res.status(400).json({ message: 'Incorrect password!'});
            return;
        }
        res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
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
        if(!dbUserData[0]){
            res.status(404).json({message: 'No user found with this id'});
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
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
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