const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;


//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//turn on routes
app.use(routes);

//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//connection to db, using sequilize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
})