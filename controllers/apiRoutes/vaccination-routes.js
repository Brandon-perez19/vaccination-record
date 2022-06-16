const router = require('express').Router();
const { Vaccination, User } = require('../../models');
const sequelize = require('../../config/connection');

//gets all vaccination
router.get('/', (req, res) => { 
    Vaccination.findAll({
        attributes: [
            'id',
            'pet_name',
            'pet_species',
            'vaccination_date',
            'created_at'
        ],
        order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: [
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
            'vaccination_date',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbVaxData => {
        if(!dbVaxData) {
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

router.post('/', (req, res) => {
    Vaccination.create({
        pet_name: req.body.pet_name,
        pet_species: req.body.pet_species,
        vaccination_date: req.body.vaccination_date
    })
        .then(dbVaxData => res.json(dbVaxData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//updates vaccination form
router.put('/:id', (req, res) => {
    Vaccination.update(
        {
            pet_name: req.body.pet_name,
            vaccination_date: req.body.vaccination_date
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbVaxData => {
        if(!dbVaxData[0]){
            res.status(404).json({message: 'No Vaccination Records found with this User'});
            return;
        }
        res.json(dbVaxData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Vaccination.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbVaxData => {
        if(!dbVaxData) {
            res.status(404).json({ message: 'No Vaccinations found with this User'});
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
