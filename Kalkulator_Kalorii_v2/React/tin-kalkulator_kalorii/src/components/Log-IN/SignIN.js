import React from 'react';
import './SignIN.css';
import { NavLink } from 'react-router-dom';

class SignIN extends React.Component {

	state = {
		name: "",
		surname: "",
		email: "",
		password: "",
		password2: "",
		BirthYear: "",


		errors: {
			name: false,
			surname: false,
			email: false,
			password: false,
			password2: false,
			BirthYear: false,
		},

		messages: {
			name: "Pole zbyt krótkie ",
			surname: "Pole zbyt krótkie",
			email: "Nieprawidłowa struktura e-mail",
			password: "zbyt krótkie hasło",
			password2: "wprowadzone hasła nie są jednakowe",
			BirthYear: "wybierz rok urodzenia",
		}


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
		else if (type === "select-one") {
			console.log(e.type)
			const selectedID = e.target.value;
			this.setState({
				[name]: selectedID
			})
		}

	}



	validators = {

		nameValidator(input) {
			if (input.length > 3 && input.indexOf(' ') === -1) {
				return true
			}
			else {
				return false
			}
		},
		emailValidator(input) {

			var emailtest = /\S+@\S+\.\S+/;
			if (input.length > 3 && emailtest.test(input)) {
				return true
			}
			else {
				return false
			}
		},
		passwordValidator(input) {
			var passtest = /(?=.{8,})/;
			if (passtest.test(input)) {
				return true
			}
			else {
				return false
			}
		},
		password2Validator(pass1, pass2) {
			if (pass1 === pass2) {
				return true
			}
			else {
				return false
			}
		},

		birthYearValidator(input) {
			if (input > 1900 && input < 2020)
				return true
			else
				return false
		},


	}

	formValidation() {
		// true - ok
		// false - zle
		let name = false;
		let surname = false;
		let email = false;
		let password = false;
		let password2 = false;
		let BirthYear = false;
		let correct = false;

		name = this.validators.nameValidator(this.state.name)
		surname = this.validators.nameValidator(this.state.surname)
		email = this.validators.emailValidator(this.state.email)
		password = this.validators.passwordValidator(this.state.password)
		password2 = this.validators.password2Validator(this.state.password, this.state.password2)
		BirthYear = this.validators.birthYearValidator(this.state.BirthYear)

		if (name && surname && email && password && password2 && BirthYear) {
			correct = true
		}

		return ({
			name,
			surname,
			email,
			password,
			password2,
			BirthYear,
			correct

		})
	}


	handleSubmit = (e) => {


		const validation = this.formValidation()
		console.log(validation)
		console.log(this.state)

		if (validation.correct) {

			 this.formPOST();
			//console.log("wyslalem post bede zerowal")
			this.setState({
				name: "",
				surname: "",
				email: "",
				password: "",
				password2: "",
				BirthYear: "",
				messages: "formularz wyslany",

				errors: {
					name: false,
					surname: false,
					email: false,
					password: false,
					password2: false,
					BirthYear: false,
				}
			}
			)
			this.render();
		} else {
			this.setState({
				errors: {
					name: !validation.name,
					surname: !validation.surname,
					email: !validation.email,
					password: !validation.password,
					password2: !validation.password2,
					BirthYear: !validation.BirthYear
				}
			})
		}
	}


	formPOST(){

		var status_utworzenia_produktu;
        let formData = new FormData()
        let productresponse = '';

        fetch('http://localhost:8080/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                password: this.state.password,
                BirthYear: this.state.BirthYear,
            })
        }).then(response => 
            {
                status_utworzenia_produktu = response.status;
            //console.log("Status odp: "+response.status)
            return response.text()
            })
        .then((response) => {
            productresponse = response
        }).then(formData.append("files", this.state.photo_file))
        .then( x =>
        {return (status_utworzenia_produktu == 201)
        })
         .then( data => {
            this.props.history.push({
                pathname: '/wiadomosc',
                message: productresponse
            })
            } 
        )

	}

	render() {

		return (
			<div className="registration">

				<div class="grid-container">
					<div class="Dodaj_produkt_label"> Rejestracja uzytkownika </div>
					<div class="nazwa_label"> Imie </div>
					<div class="wegle_label"> Nazwisko</div>
					<div class="bialko_label"> e-mail </div>
					<div class="tluszcze_label"> hasło </div>
					<div class="haslo_potwierdzenie"> ponów hasło </div>
					<div class="kategoria_label"> Rok urodzenia </div>

					{this.state.errors.name && <div id='nazwa_label_error' class="error"> {this.state.messages.name} </div>}
					{this.state.errors.surname && <div id="nazwisko_label_error" class="error"> {this.state.messages.surname} </div>}
					{this.state.errors.email && <div id="email_label_error" class="error">{this.state.messages.email} </div>}
					{this.state.errors.password && <div id="haslo_label_error" class="error"> {this.state.messages.password} </div>}
					{this.state.errors.password2 && <div id="haslo_potwierdzenie_error" class="error">  {this.state.messages.password2} </div>}
					{this.state.errors.BirthYear && <div id="rok_urodzenia_label_error" class="error"> {this.state.messages.BirthYear} </div>}
					{/* <div id="dodawanie_label_error" class="error"> błąd w dodawaniu produktu </div> */}


					<div class="imie_label_input"> <input type="text" name="name" onChange={this.handleChange} id="imie_label_input" class="input"></input> </div>
					<div class="nazwisko_label_input"> <input type="text" name="surname" onChange={this.handleChange} id='nazwisko_label_input' class="input"></input> </div>
					<div class="email_label_input"> <input type="text" name="email" onChange={this.handleChange} id='email_label_input' class="input"></input> </div>
					<div class="haslo_label_input"> <input type="password" name="password" onChange={this.handleChange} id='haslo_label_input' class="input" type="password"></input> </div>
					<div class="haslo_potwierdzenie_input"> <input type="password" name="password2" onChange={this.handleChange} id='haslo_potwierdzenie_input' class="input" type="password"></input> </div>
					<div class="rok_urodzenia_label_input">
						<select type="select" name="BirthYear" onChange={this.handleChange} id='rok_urodzenia_label_input' >


							<option value="1970"> less than 1970</option>
							<option value="1971">1971</option>
							<option value="1972">1972</option>
							<option value="1973">1973</option>
							<option value="1974">1974</option>
							<option value="1975">1975</option>
							<option value="1976">1976</option>
							<option value="1977">1977</option>
							<option value="1978">1978</option>
							<option value="1979">1979</option>
							<option value="1980">1980</option>
							<option value="1981">1981</option>
							<option value="1982">1982</option>
							<option value="1983">1983</option>
							<option value="1984">1984</option>
							<option value="1985">1985</option>
							<option value="1986">1986</option>
							<option value="1987">1987</option>
							<option value="1988">1988</option>
							<option value="1989">1989</option>
							<option value="1990">1990</option>
							<option value="1991">1991</option>
							<option value="1992">1992</option>
							<option value="1993">1993</option>
							<option value="1994">1994</option>
							<option value="1995">1995</option>
							<option value="1996">1996</option>
							<option value="1997">1997</option>
							<option value="1998">1998</option>
							<option value="1999">1999</option>
							<option value="2000">2000</option>
							<option value="2001">> 2001</option>
						</select>
					</div>
					<div class="produkt_powrot">
						<a href="../Data/Glowna.html" >powrót</a>
					</div>

					<div id='dodaj_usera' class="produkt_dodaj">
						<a onClick={this.handleSubmit} id='zarejestruj_sie_link' href="#top" >Zarejestruj się</a>
					</div>

				</div>
			</div>
		)
	}
}
export default SignIN;