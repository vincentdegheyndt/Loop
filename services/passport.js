const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

//turn back id in cookie into actual user model
passport.deserializeUser((id,done)=>{
    User.findById(id)
        .then(user=>{
            done(null, user)
        })
})

passport.use(
    new GoogleStrategy({
        clientID:keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL:'/auth/google/callback',
        proxy:true
    }, async (accessToken, refreshToken, profile, done)=>{
        const existingUser = await User.findOne({googleId:profile.id})
        if(existingUser){
        //we already have a record with the given profile ID
        return done(null, existingUser)//null here is an error object;
        }
        //make a new record
        const user = await new User({googleId:profile.id, email:profile.emails[0].value})
        .save()//save on db
        done(null, user)
    })
);