const router = require('express').Router();
const { Vaccination, User } = require('../../models');
const withAuth = require('../../utils/auth')

//gets all vaccination
router.get('/', (req, res) => {
    Vaccination.findAll({
        attributes: [
            'id',
            'pet_name',
            'pet_species',
            'vaccine',
            'vaccination_date',
            'user_id',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: [
                    'id',
                    'username'
                ]
            }
        ]
    })
        .then(VaxData => res.json(VaxData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    Vaccination.findOne({
        //pulls based off users id
        where: {
            id: req.params.id
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
                attributes: ['username', 'id']
            }
        ]
    })
        .then(dbVaxData => {
            if (!dbVaxData) {
                res.status(404).json({ message: 'No Vaccination Forms found with this user' });
                return;
            }
            res.json(dbVaxData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Vaccination.create({
        pet_name: req.body.pet_name,
        pet_species: req.body.pet_species,
        vaccine: req.body.vaccine,
        vaccination_date: req.body.vaccination_date,
        user_id: req.session.user_id
    })
        .then(dbVaxData => res.json(dbVaxData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//updates vaccination form
router.put('/:id', withAuth, (req, res) => {
    Vaccination.update(
        {
            pet_name: req.body.pet_name,
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbVaxData => {
            if (!dbVaxData) {
                res.status(404).json({ message: 'No Vaccination Records found with this User' });
                return;
            }
            res.json(dbVaxData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Vaccination.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbVaxData => {
            if (!dbVaxData) {
                res.status(404).json({ message: 'No Vaccinations found with this User' });
                return;
            }
            res.json(dbVaxData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
