import React, {Component} from 'react'
import SurveyBox from '../components/surveys/SurveyBox'

class Landing extends Component{
  state={
    // data:[{y: "Pending", x:100, label:"Pending", color:2, xOffset:5},{y: "No", x:32, label:"No", color:0, xOffset:5},{y: "Yes", x:68, label:"Yes", color:1, xOffset:5}]
    survey:{
      body: "Are you satisfied with your experience on our platform ?",
      dateSent: "2021-02-19T12:53:46.816Z",
      deleted: false,
      lastResponded: "2021-02-19T12:54:04.071Z",
      no: 32,
      subject: "My Survey",
      title: "My Survey",
      total: 200,
      yes: 68,
    }
  }


  render(){
    return(
      <div style={{textAlign:'center'}}>
        <h3>Collect feeback from your users!</h3>
        <p>LOOP allows you to send surveys to a list of recipients regarding your application in order to get feedback</p>
        <p>Every recipient will have the opportunity to answer with a simple "yes" or "no"</p>
        <p>Review your surveys' results at any time through the menu</p>
        <p>One survey for one credit</p>
        <h5 style={{textAlign:'left'}}>Example</h5>
        <div style={{textAlign:'left'}}>
          <SurveyBox survey={this.state.survey} noDelete={true}/>
        </div>
      </div>
    )
  }
}

export default Landing