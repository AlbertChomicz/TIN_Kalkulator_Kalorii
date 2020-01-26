import React from 'react';
import {NavLink, BrowserRouter, Link} from 'react-router-dom';

import './Header.css';
import fota from '../../img/logo.jpg'
import { withCookies } from 'react-cookie';


class Header extends React.Component {

    state = {
        login: "",
        pass: "",
        isLoading: true,
        isAuthenticated: false,
        user: undefined
    }

   

    handleSubmit(){

           let url = "http://localhost:8080/"
         
           console.log("login: "+this.state.login)
           console.log("pass: "+this.state.pass)
            var formData = new FormData();
            formData.append("username",this.state.login);
            formData.append("password",this.state.pass);
            fetch(url+ "login",
            {
                method: "POST",
                credentials: "same-origin",
                body: formData
            }
            )
                .then(
               
                    response => {
                    console.log(response.status)
                    console.log(response)
                    }
                )
                // .then()(
                //     ()=>{
                //     this.refresh();
                //     setTimeout(function() {
                //         data.target.reset();
                //         this.username = null;
                //         this.password = null;
                //     },500);
                // })

                .catch(error=>console.error(error));
    }

    handleChange = (e) => {
		//console.log(e.target.type)
		const name = e.target.name;
		const type = e.target.type;
        
        if (type === "text" || type === "password" || type === "email") {
			const value = e.target.value;
			// const checked = e.target.checked;
			this.setState({
				[name]: value
			})
    }
   
    }



    render() {

        console.log(this.state.login)
        console.log(this.state.pass)


        return (
    <div className = "header">
    <div className="fota">
        <img id="ananasy" src={fota} alt="ananasy - header" />
      
    </div>

    <div className="tytul">
        <h1>Kalkulator Kalorii</h1>
    </div>

    <div className="logowanie">
            

				<form>
                <br></br>
                <p>Login:</p>
				<input type="text" name="login" onChange = {this.handleChange}></input>
                <br></br>
                <p>Hasło:</p>
                <input type="password" name="pass" onChange = {this.handleChange}></input>
                <br></br>
                
                <br></br>
                <br></br>
				</form>
                <input type="submit" onClick={() => this.handleSubmit()} value="Zaloguj sie"></input>
         

			</div>
           
    </div>
     )
    }               
}             
     export default Header
                                        
