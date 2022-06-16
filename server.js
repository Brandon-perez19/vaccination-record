const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection')
const path = require('path');

//server set-up
const app = express();
const PORT = process.env.PORT || 3001;

//importing handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//send back static image file
app.use(express.static(path.join(__dirname, 'public')));

//turn on routes
app.use(routes);

//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//connection to db, using sequilize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening at Port ${PORT}`));
});