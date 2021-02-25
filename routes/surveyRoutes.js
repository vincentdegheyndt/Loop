const _ = require('lodash')
const {Path} = require('path-parser')
const {URL} = require('url')//included in node
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');

const Survey = mongoose.model('surveys')

module.exports = app=>{
    app.get('/api/surveys',requireLogin, async (req,res)=>{
        const surveys = await Survey.find({_user:req.user.id})
            .select({recipients:false});

        res.send(surveys);
    })

    app.get('/api/surveys/:surveyId/:choice', (req,res)=>{
        res.send('Thanks for voting!')
    })

    app.post('/api/surveys/webhooks', (req,res)=>{
        const p = new Path('/api/surveys/:surveyId/:choice')
        _.chain(req.body)
            .map(({email, url})=>{
                const match = p.test(new URL(url).pathname)
                if (match){
                    return {email, surveyId:match.surveyId, choice:match.choice}
                }
            })
            // remove undefined elements
            .compact()
            //remove all duplicates for both keys (at the same time)
            .uniqBy('email', 'surveyId')
            //mongoDb query
            .each(({surveyId, email, choice})=>{
                //model class Survey
                Survey.updateOne({
                    // findOne
                    //_id is mondo syntax
                    _id:surveyId,
                    recipients:{
                        $elemMatch:{email:email, responded:false}
                    }
                },{//then update it
                    //[choice] not array
                    //is value of choice (yes or no)
                    $inc:{[choice]:1},//increment
                    //within filtered results
                    //change responded prop to true
                    $set:{'recipients.$.responded':true},
                    lastResponded: new Date()
                }).exec()//execute !!
            })
            //return final value
            .value();

        res.send({});
    })

    app.post('/api/surveys',requireLogin,requireCredits, async (req,res)=>{
        const {title, subject, body, recipients }=req.body;
        const recipientsArray = recipients.split(',').map(email=>({ email: email.trim()}))
        const total = recipientsArray.length
        
        const survey = new Survey({
            title, 
            subject, 
            body, 
            total,
            //.map(email=>{email}) is the same
            //.map(email=>return {email:email})
            recipients: recipientsArray,
            //yes and no will be defaulted
            _user:req.user.id,
            dateSent:Date.now()
        });

        //Send the email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send()
            await survey.save()
            req.user.credits -= 1
            const user = await req.user.save()
    
            res.send(user)
        }catch(err){
            res.status(422).send(err)
        }
    });
    app.delete('/api/surveys/:surveyId', function(req, res) {
        Survey.findOneAndDelete({
            _id: req.params.surveyId
        }, function(err, survey) {

            if (err)
                res.send(err);
            res.send({ message: 'Survey deleted!' })
        });

    });
};

