const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urelencoded({ extended: false }));
app.use(express.json());

//use apiRoutes
app.use('/api', apiRoutes);

//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//connection to db, using sequilize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
})