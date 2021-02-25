import _ from 'lodash';
import {connect } from 'react-redux'
import formFields from './formFields'
import * as actions from '../../actions'
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history, credits})=>{
    console.log(credits)
    const reviewFields = _.map(formFields, ({name, label})=>{
        return (
            <div key={name}>
                <label>{label}</label>
                <div style={{marginBottom:10}}>
                    {formValues[name]}
                </div>
            </div>
        )
    })
    return(
        <div>
            <h5 style={{marginBottom:15}}>Please review your entries</h5>
            <div className="card">
            <div className="card-content">
            {reviewFields}
            </div>
            <div className="card-action">
                <button
                className=" red lighten-2 white-text btn-flat"
                onClick={onCancel}
                >
                Back
                </button>

                <button 
                onClick={()=>submitSurvey(formValues, history)}
                className="teal btn-flat right white-text"
                disabled={credits===0}
                >
                {credits===0 ? "No credits left" : "Send Survey"}
                <i className="material-icons right">email</i>
                </button>
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return{formValues:state.form.surveyForm.values, credits:state.auth.credits}
}
//withRoutet give access to history
// so actions can use that to go to '/surveys'
// when async action is complete
export default withRouter(connect(mapStateToProps, actions)(SurveyFormReview))