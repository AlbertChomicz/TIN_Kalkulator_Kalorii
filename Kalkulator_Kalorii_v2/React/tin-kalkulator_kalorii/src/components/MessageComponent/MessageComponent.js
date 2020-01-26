import React from 'react';
import './MessageComponent.css';
import {BrowserRouter, NavLink, Route} from 'react-router-dom';


class MessageComponent extends React.Component {
    

    render(){
        console.log(this.props.location.message)
        return(

    <div className="messageComponent">
        <h1>{this.props.location.message}</h1>
        <NavLink to="/Main" exact>Powrót do strony głównej</NavLink>
    </div>

            )
    }

}
export default MessageComponent