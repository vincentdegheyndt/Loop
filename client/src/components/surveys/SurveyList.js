import React, {Component} from 'react'
import {connect } from 'react-redux'
import {fetchSurveys, deleteSurvey} from '../../actions'
import SurveyBox from './SurveyBox'
import {Link} from 'react-router-dom'

class SurveyList extends Component{
        state={showSurveys:false,invertList:false}
    componentDidMount(){
        this.props.fetchSurveys()
        this.setState({showSurveys:true})
    }
    handleDelete= async(id)=>{
        this.props.deleteSurvey(id)
        this.props.fetchSurveys()
    }

    renderSurveys(){
        const surveyList = this.state.invertList? this.props.surveys.reverse():this.props.surveys               
        return surveyList.filter((survey)=>!survey.deleted).map((survey,i)=>{
            return <div key={survey._id}>
                <SurveyBox survey={survey} handleDelete={this.handleDelete} />
                </div>
        })
    }
    render(){
        return(
            <div>
                {this.props.surveys.length===0&&(
                    <div style={{textAlign:'center', marginTop:15}}>
                        <h5>You currently have no surveys</h5>
                        <Link to="/surveys/new" className="waves-effect waves-light btn-large red darken-2"style={{marginTop:10}}>
                            Create one here
                        </Link>
                    </div>
                )}
                {this.state.showSurveys&&
                this.props.surveys.length!==0&&(
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                        <h5 style={{marginBottom:15}}>Your survey list</h5>
                        {/* eslint-disable-next-line */}
                        <a className="waves-effect waves-light btn-flat" onClick={()=>{
                            this.setState({invertList:!this.state.invertList})
                            this.renderSurveys()
                        }}>
                            {!this.state.invertList
                                ?<i className="material-icons left">arrow_drop_down</i>
                                :<i className="material-icons left">arrow_drop_up</i>}
                            Invert list
                        </a>
                    </div>
                )}
                {this.state.showSurveys&&this.renderSurveys()}

            </div>
        )
    }
}

function mapStateToProps({surveys}){
    return{surveys}
}


export default connect(mapStateToProps, {fetchSurveys,deleteSurvey})(SurveyList)
