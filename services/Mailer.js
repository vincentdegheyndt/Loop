const sendgrid = require('sendgrid')
const {mail: helper} = sendgrid
const keys = require('../config/keys')

class Mailer extends helper.Mail{
    //props in the constructor
    constructor({subject, recipients}, content){
        super();//bind all methods from helper.Mail

        this.sgAPI = sendgrid(keys.sendGridKey)
        //should be changed to no reply of something 
        this.from_email = new helper.Email('vincent.degheyndt@gmail.com')
        this.subject = subject
        this.body = new helper.Content('text/html', content)
        this.recipients = this.formatAddresses(recipients)
        //addContent comes from helper.Mail
        this.addContent(this.body)
        this.addClickTracking()
        this.addRecipients();
    }

    formatAddresses(recipients){
        return recipients.map(({email})=>{
            //format function
            return new helper.Email(email)
        })
    }
    addClickTracking(){
        //sendgrid code. just go with the flow
        const trackingSettings = new helper.TrackingSettings()
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking)
        this.addTrackingSettings(trackingSettings)
    }
    addRecipients(){
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient=>{
            personalize.addTo(recipient)
        })
        this.addPersonalization(personalize)
    }
    async send(){
        const request = await this.sgAPI.emptyRequest({
            method:'POST',
            path:'/v3/mail/send',
            body:this.toJSON()
        })
        //sends to sendgrid (function call)
        const response = this.sgAPI.API(request)
        return response
    }
}


module.exports = Mailer