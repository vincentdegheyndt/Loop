const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
//ne return rien de spcéficique donc pas d'assignation
// require assure que le contenu du fichier sera exécuté
require('./models/User')//ordre est important !
require('./models/Survey')
require('./services/passport')

mongoose.connect(keys.mongoURI, {useNewUrlParser:true,useUnifiedTopology:true});

const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,//ms
        keys:[keys.cookieKey]
    })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//only in prod
if(process.env.NODE_ENV === "production"){
    //express will serve up prod assets
    //main.js, main.css,...
    app.use(express.static('client/build'))

    //expresse will serve up index.html 
    //if it doesn't recognize the route
    const path = require('path')
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT) 
