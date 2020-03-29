const express = require('express');
const http = require('http');
const routes = require('./src/routes/routes.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

require('./src/config/passport.js');

app.use('*', function (req, res, next) {
	res.contentType('application/json');
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/flierefluiter');

app.use(cors());

//In case we want to move over to mlab.
//mongoose.connect('mongodb://*mlab-url-here*').then(() => {
//	console.log('Connected to mlab.');
//}, (err) => {
//	console.log('error', err);
//});


app.use('/api', routes);
app.use('/api/field', passport.authenticate('jwt', { session: false }), routes);

app.use('*', function (err, req, res, next) {
	console.log('Error: ' + err);
	res.status(404).json({ error: err }).end();
});

app.listen(port, function () {
	console.log('Server listens on port ' + port);
});

module.exports = app;