import React from 'react';
import {Link} from 'react-router-dom'
import M from "materialize-css";
import Payments from './Payments';

const PlusButton = () => {
    React.useEffect(()=>{
        const elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {
            direction: 'top',
            hoverEnabled: false
          });
    },[])

    return(
            <div className="fixed-action-btn click-to-toggle">
                {/* eslint-disable-next-line */}
                <a className="btn-floating btn-large blue darken-1">
                    <i className="large material-icons">menu</i>
                </a>
                <ul>
                    <li>                        
                        <Link to="/" className="btn-floating btn black">
                            <i className="material-icons">loop</i>
                        </Link>
                    </li>    
                    <li>                        
                        <Payments/>
                    </li>   
                    <li>                        
                        <Link to="/surveys" className="btn-floating btn blue darken-1">
                            <i className="material-icons">dvr</i>
                        </Link>
                    </li>                    
                    <li>
                    <Link to="/surveys/new" className="btn-floating btn red darken-2">
                            <i className="material-icons">fiber_new</i>
                    </Link>
                    </li>
                </ul>
            </div>
    )
}

export default PlusButton