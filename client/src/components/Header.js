import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import Payments from './Payments'

class Header extends Component{

  renderContent(){
    switch(this.props.auth){
      case null:
        return ;
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>
      default:
        //must return 1 and only 1 element
        return <>
          {/* <li><Payments/></li> */}
          <li style={{margin:'0 10 px'}}>
            Credits:{" "+this.props.auth.credits}
          </li>
          <li><a href="/api/logout">Logout</a></li>
        </>
        //alternative using an array
      //   return [
      //   <li key="1"><Payments/></li>,
      //   <li key="2"><a href="/api/logout">Logout</a></li>
      // ]
    }
  }
  render(){
    return(
      <nav>
        <div className="nav-wrapper blue darken-1">
          <Link 
          to={this.props.auth?'/':'/'}
          className="left brand-logo"
          >
            <i className="material-icons">loop</i>
            Loop
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({auth}){
  return {auth}
}

export default connect(mapStateToProps) (Header)