const router = require('express').Router();
const { User, Vaccination } = require('../models');
const sequelize = require('../config/connection');


//get all vaccinations related to user
router.get('/', (req, res) => {
    Vaccination.findAll({
        where: {
            // user_id: req.session.user_id
            user_id: 1
        },
        attributes: [
            'id',
            'pet_name',
            'pet_species',
            'vaccine',
            'vaccination_date',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    })
    .then(dbVaccinationData => {
        //serialize data
        const vaccines = dbVaccinationData.map( vaccines => vaccines.get ({ plain: true }));
        console.log('=====================')
        console.log(vaccines)
        //pass data to template 'dashboard'
        res.render('dashboard', {
            vaccines,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })

});

//edit single vaccination record to specific user
router.get('/edit/:id', (req, res) => {
    Vaccination.findByPk(req.params.id, {
        attributes: [
            'id',
            'pet_name',
            'pet_species',
            'vaccination_date',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    })
    .then(dbVaccinationData => {
        if(dbVaccinationData) {
            const vaccine = dbVaccinationData.get({ plain: true});
            res.render('edit-vaccination', { vaccine, loggedIn: true});

        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;

