import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'


import Header from './Header';
import Landing from './Landing';
import SurveyList from './surveys/SurveyList';
import SurveyNew from './surveys/SurveyNew';
import PlusButton from './PlusButton';
import Payments from './Payments';

class App extends Component{
    componentDidMount(){
        this.props.fetchUser()
    }

    render(){
        return(
            <div className="container">
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/surveys" component={SurveyList}/>
                        <Route path="/surveys/new" component={SurveyNew}/>
                        <Route path="/payment" component={Payments}/>
                        {this.props.auth &&(<PlusButton/>)}
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}


// const App = (actions)=>{

//     React.useEffect(()=>{
//         actions.fetchUser()
//     })
//     return(
//         <div className="container">
//             <BrowserRouter>
//                 <>
//                     <Header />
//                     <Route exact path="/" component={Landing}/>
//                     <Route exact path="/surveys" component={Dashboard}/>
//                     <Route path="/surveys/new" component={SurveyNew}/>
//                 </>
//             </BrowserRouter>
//         </div>
//     )
// }
function mapStateToProps({auth}){
    return {auth}
  }

export default connect(mapStateToProps, actions)(App);