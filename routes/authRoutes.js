const passport = require('passport')

module.exports=(app)=>{
    //'google' dans authenticate est le nom sous entendu de la strategy ci-dessus
    app.get('/auth/google', passport.authenticate('google', {
        //ce à quoi on demande d'avoir accès
        scope:['profile', 'email']
    }))

    //get callback url
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req,res) => {
            res.redirect('/surveys')
        }
    )

    app.get('/api/logout', (req,res)=>{
        req.logout();//fct de passport
        res.redirect('/')
    })

    app.get('/api/current_user', (req,res)=>{
        res.send(req.user);
    })
}

