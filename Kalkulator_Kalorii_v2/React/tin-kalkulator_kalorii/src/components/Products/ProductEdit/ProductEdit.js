
import React from 'react';
import './ProductEdit.css';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { createHashHistory } from 'history'
import { Route, withRouter } from 'react-router-dom';

export const history = createHashHistory()

var API = 'http://localhost:8080/product/';



class ProductEdit extends React.Component {

    state = {
        product: "",
        productIDinput: -1,
        grams: "",
        carbohydrates: "",
        proteins: "",
        fat: "",
        validation: false

    }

    handleDataFetch = () => {
        let qwe = (this.props.productID > 0) ? this.props.productID : 1
        fetch('http://localhost:8080/product/' + qwe)
            .then(response => response.json())
            .then(data => {
                console.log("data:");
                console.log(data);
                this.setState({
                    product: data
                })
                console.log(this.state.product);
            })
            .catch(error => console.log(error + "cos nie tak"))
    }

    componentDidUpdate() {

        console.log(this.state.carbohydrates)
        console.log(this.state.proteins)
        console.log(this.state.fat)

        if (((this.state.productIDinput) == (this.props.productID))) {

            console.log("dubel")

        }
        else {
            API = 'http://localhost:8080/product/' + this.props.productID
            this.state.productIDinput = this.props.productID
            this.handleDataFetch()
        }
    }

    sumakcal() {
        let kcal = this.state.product.carbohydrates * 4 + this.state.product.protein * 4
            + this.state.product.fat * 9;
        return (kcal > 0) ? kcal : 0;
    }

    handleChange = (e) => {
        //console.log(e.target.type)
        const name = e.target.name;
        const type = e.target.type;

        if (type === "text" || type === "password" || type === "email") {
            console.log("zmieniam: " + name)
            const value = e.target.value;
            // const checked = e.target.checked;
            this.setState({
                [name]: value
            })
        }
    }


    
    formValidation() {
        // true - ok
        // false - zle
        let carbohydrates = false;
        let proteins = false;
        let fat = false;
        let correct = false
      
        carbohydrates = this.validators.gramsValidator(parseFloat(this.state.carbohydrates))
        proteins = this.validators.gramsValidator(this.state.proteins)
        fat = this.validators.gramsValidator(this.state.fat)
       

        if (carbohydrates && proteins && fat) {
            correct = true
        }

        return ({
            carbohydrates,
            proteins,
            fat,
            correct

        })
    }


    validators = {

        gramsValidator(input) {
            if (input > 0 && input < 100)
                return true
            else
                return false
        }
    }


    handleSubmit(){
        const validation = this.formValidation()
        console.log(validation)

        if (validation.correct) {
            
            this.setState({
                validation: false
            })

            console.log("walidacja OK")
            this.formPUT("PUT");
        }
        else{
            this.setState({
                validation: true
            })
        }


    }

    handleDeleteSubmit(){

        this.formPUT("DELETE")

    }


    formPUT(inputmethod) {

        console.log("robie: "+inputmethod)

        var status_utworzenia_produktu = "";
        var product_response = ""

            fetch('http://localhost:8080/product/' + this.props.productID, {
                method: inputmethod,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.product.name,
                    carbohydrates: (this.state.carbohydrates > 0) ? this.state.carbohydrates : this.state.product.carbohydrates,
                    protein: (this.state.proteins > 0) ? this.state.proteins : this.state.product.proteins,
                    fat: (this.state.fat > 0) ? this.state.fat : this.state.product.fat,
                    category: this.state.product.category,
                    photoname: this.state.product.photoname
                })
            }).then(response => {

                status_utworzenia_produktu = response.status;
                console.log(status_utworzenia_produktu)
                return response.text()
            })
            
                .then((response) => {
                    product_response = response
                    return response

                })
                .then( x =>
                    {
                        console.log(status_utworzenia_produktu)
                        return (status_utworzenia_produktu == 201 || status_utworzenia_produktu == 200)
                    })
                .then(bool => {
                    console.log(bool)

                    if(bool)
                    this.props.wiadomoscSend(product_response);
                    else{
                        this.props.wiadomoscSend("Wystąpił nieoczekiwany błąd - produkt nie został usunięty"); 
                    }
                }
                )
    }






    render() {
        return (

            <div className="SRODKOWY">

                <div className="nazwa_wybranego_produktu">{this.state.product.name}</div>
                <div className="wybrane_produkty_label">Makro składniki na 100g:</div>

                <div className="opakowanie_makro">
                    <div className="produkty">Węglowodany: <br></br> {this.state.product.carbohydrates} </div>
                    <div className="produkty">Białko: <br></br> {this.state.product.protein} </div>
                    <div className="produkty">Tłuszcze: <br></br> {this.state.product.fat} </div>
                    <div className="produkty">kcal <br></br> {this.sumakcal()}</div>
                </div>


                <div className="wybrane_produkty_label_nowa_wartosc">Wprowadź nowe makro składniki na 100g produktu:</div>
                <div className="produkty"> Weglowodany: <br></br>
                    <input type="text" name="carbohydrates" onChange={this.handleChange.bind(this)} id="wegle_input" className="input"></input>
                </div>
                <div className="produkty">>Białko: <br />
                    <input type="text" name="proteins" onChange={this.handleChange} id="bialko_input" className="input"></input>
                </div>
                <div className="produkty">Tłuszcze: <br />
                    <input type="text" name="fat" onChange={this.handleChange} id="tluszcze_input" className="input"></input>
                </div>
                <div className="produkty">kcal <br></br></div>
                {this.state.validation && <div className="error" id="zdjecie_label_error"> Proszę o wypełnienie wszystkich pól wartościami od 0 do 99</div>}

                <div onClick={() => this.handleSubmit()} className="PROD_EDIT_produkt_edytuj" >
                    <a id="zapisz_zmiany">Zapisz zmiany</a>
                </div>

                <div className="PROD_EDIT_produkt_edytuj" >
                    <a id="produkt_usun" onClick={() => this.handleDeleteSubmit()} href="#">Usuń produkt</a>
                </div>


            </div>


        )
    }

}

export default ProductEdit