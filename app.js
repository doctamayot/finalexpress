const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const flash = require("flash");
const path = require('path');
require("./models/Poll");
require("./models/User");
const routes = require('./routes');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//app.use(express.static('public'));
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ secret: process.env.SECRET || "secretcode" }));
app.use(flash());
//app.use(assets());




// routes

//require('./routes/polls.js')(app);
//require('./routes/account.js')(app);
app.use('/', routes);





// Configuring the database


mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://doctamayot:calimenio3125@ds157723.mlab.com:57723/heroku_bxjt6kzm',{ useNewUrlParser: true 
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`App is running on port ${ PORT }`);
})


module.exports = app;
