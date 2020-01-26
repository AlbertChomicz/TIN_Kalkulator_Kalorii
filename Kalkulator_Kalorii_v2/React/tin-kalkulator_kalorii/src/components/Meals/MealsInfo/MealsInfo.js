
import React from 'react';
import './MealsInfo.css';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import Select_option_creator from './../../Products/ProductsSearch/Select_option_creator'

var API = 'http://localhost:8080/meal/';

var carbohydrates;
var proteins;
var fat;
var kcal;

class MealsInfo extends React.Component {

    state = {
        product: "",
        meal: "",
        productIDinput: -1,
        grams: "",
        LoadData: false

    }

    handleDataFetch = () => {
        let qwe = (this.props.MealID > 0) ? this.props.MealID : 1
        console.log("wchodze do fetacha")
        fetch('http://localhost:8080/meal/' + qwe)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    meal: data
                })
                console.log("MEAL w INFO");
                console.log(this.state.meal);
                this.setState({ LoadData: true })
                
            })
            .catch(error => console.log(error + "cos nie tak"))
    }

    componentDidUpdate() {
        console.log("MEALID")
        console.log(this.props.mealID)
        if (this.state.productIDinput == (this.props.MealID)) {
            console.log("dubel")

        }
        else {

            this.state.productIDinput = this.props.MealID
            this.handleDataFetch()
            this.setState({ LoadData: true })
            console.log(this.state.meal)
        }
    }

    sumakcal() {
        kcal = carbohydrates * 4 + proteins * 4 + fat * 9;
        return (kcal > 0) ? kcal : 0;
    }

   renderKCAL(skladniki_posilku){

        carbohydrates = 0;
        proteins = 0;
        fat = 0;
        if (!(this.state.meal.meal_products === undefined)){
        skladniki_posilku.map(s => {
            proteins += this.round(s.product.protein*(s.grams/100),1);
            carbohydrates += this.round(s.product.carbohydrates*(s.grams/100),2);
            fat += this.round(s.product.fat*(s.grams/100),2);
      
        }
        );
        this.sumakcal();
    }}


    round(n, k) {
        var factor = Math.pow(10, k);
        return Math.round(n * factor) / factor;
    }

    handlePrzeliczButton() {

        carbohydrates = this.round(this.state.product.carbohydrates * this.state.grams / 100, 1);
        proteins = this.round(this.state.product.protein * this.state.grams / 100, 1);
        fat = this.round(this.state.product.fat * this.state.grams / 100, 1);
        kcal = this.round(carbohydrates * 4 + proteins * 4 + fat * 9, 1);
        this.setState({ productIDinput: -1 })

    }

    validateFloat = element => {
        let onlyDotregex = /^[0-9.]+$/
        return (!onlyDotregex.test(String(element)))
    }

    handleViewChange() {

        this.props.setView(false, true)

    }



    render() {
        //console.log('http://localhost:8080/product/' + this.props.productID)
        console.log(this.state.grams)
        console.log("to bede wysylal :")
        console.log(this.state.meal)
        this.renderKCAL(this.state.meal.meal_products)

        return (

            <div id="MEALSINFO_SRODKOWY">

                <div className="MEALSINFO_produkty_nazwa_wybranego_posilku" id="nazwa_wybranego_posilku">
                   <h1> {this.state.meal.name} </h1></div>


                <div className="MEALSINFO_produkty">
                    <table className="MEALSINFO_ingredients-table">
                        <thead>
                            <tr>
                                <th>Produkt</th>
                                <th>Gramatura</th>
                                <th> </th>
                            </tr>
                           {this.state.LoadData && <Select_option_creator mealinfo = {true} meal = {this.state.meal}></Select_option_creator>}
                        </thead>
                        <tbody id="tbody_ingredients">

                        </tbody>
                    </table>
                </div>
        <div id="produkty_weglowodany_nowa_wartosc" className="MEALSINFO_produkty_nowa_wartosc">Węgle: <br></br> {this.round(carbohydrates,2)} </div>
                <div id="produkty_bialko_nowa_wartosc" className="MEALSINFO_produkty_nowa_wartosc">Białko: <br></br> {this.round(proteins,2)}  </div>
                <div id="produkty_tluszcze_nowa_wartosc" className="MEALSINFO_produkty_nowa_wartosc">Tłuszcze: <br></br> {this.round(fat,2)}  </div>
                <div id="produkty_kcal_nowa_wartosc" className="MEALSINFO_produkty_nowa_wartosc">kcal <br></br> {this.round(kcal,2)} </div>

                <div className = "MealsINFO_textdiv">
                <textarea className = "MealsINFO_textarea" value =   {this.state.meal.opis}>
                
                </textarea>
            </div>

            <div className="MEALSINFO_przycisk_prod_info" id="produkt_edytuj">
            <a onClick={() => this.props.setView(false, true)} >Edytuj posiłek</a>
        </div>

        <div className="MEALSINFO_przycisk_prod_info" id="produkt_dodaj">
        <a onClick={() => this.props.setView(true, false)} >Dodaj posiłek</a>
        </div>


            </div>

         
        )

    }
}
export default MealsInfo;