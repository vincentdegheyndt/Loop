import _ from 'lodash'
import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import {Link} from 'react-router-dom'
import SurveyField from './SurveyField';
import validateEmails from "../../utils/validateEmails";
import formFields from './formFields'


class SurveyForm extends Component{
    renderFields(){
        return _.map(formFields, ({label, name}) =>{
            return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
        })
    }
    // handleSubmit est fourni par reduxForm
    render(){
        return(
            <div>
                <h5 style={{marginBottom:15}}>Create a new survey</h5>
                <form className="card" onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                <div className="card-content">
                {this.renderFields()}
                </div>
                    <div className="card-action">
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                    </div>
                </form>
            </div>
        )
    }
}

const validate = (values)=>{
    const errors = {};

    errors.recipients = validateEmails(values.recipients||'')
    
    _.each(formFields,({name, noValueError})=>{
        //key prop on object. not its actual value
        if(!values[name]){
            errors[name] = noValueError
        }
    })

    return errors;
    //if empty errors object is returned, 
    //reduxForm assumes validation is okay
}

export default reduxForm({
    validate,//reduxForm send all values in the props
    form:'surveyForm',
    //conserve values if switch entre review et normal
    destroyOnUnmount:false
})(SurveyForm)