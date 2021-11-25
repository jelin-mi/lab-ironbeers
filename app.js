const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials((path.join(__dirname + "/views/partials")));

// ...

// Add the route handlers here:

// HOMEPAGE
app.get('/', (req, res) => {
  res.render('index');
});

// BEERS PAGE
app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then((beersFromApi) => {
    res.render('beers', { beersFromApi });
  })
  .catch(error => console.log(error));
});

//RANDOM BEER PAGE
app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then((responseFromAPI) => {
    res.render('random-beer', { responseFromAPI });
  })
  .catch(error => console.log(error));
});

// SERVER
app.listen(3000, () => console.log('🏃‍ on port 3000'));
