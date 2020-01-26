import React, { Component } from 'react';
import './Meals.css';

import MealsSearch from './MealsSearch/MealsSearch'
import MealsInfo from './MealsInfo/MealsInfo';
import ProductPhoto from './../Products/ProductsPhoto/ProductsPhoto'
import ProductsSearch from '../Products/ProductsSearch/ProdutsSearch';
import MealsAdd from '../Meals/MealsAdd/MealsAdd';

class Meals extends React.Component {
   
    state = {
        mealID: "",
        photoName: "",
        
        MealEdit: false,
        MealAdd: false,
        productID: -1,
        grams: 0
        
    }

    setID(id){
        this.setState({
            mealID: id
            })
        //console.log("jestem tu"+this.state.productID)
    }

    setProductsID(id, gramy){
        this.setState({
            productID: id,
            grams: gramy
            })
        console.log("jestem tu"+this.state.productID)
    }
    

    setView(adding, editing){
        this.setState({
            MealAdd: adding,
            MealEdit: editing
            
            })
        console.log("SPRAWDZAM METODE SETVIEW MEalEdit: "+this.state.MealEdit)
        console.log("SPRAWDZAM METODE SETVIEW MealAdd: "+this.state.MealAdd)
    }

    changeView(){
        if(this.state.edit == true){
            this.setState({
                productInfo: !this.state.productInfo,
                edit: !this.state.edit
                })
        }
        else{
            this.props.history.push({
                pathname: '/Main',
            })
        }
    }

    wiadomoscSend(response){

        this.props.history.push({
            pathname: '/wiadomosc',
            message: response
        })
     
    }

   
    render() {
        
        // console.log("meal id przekazany"+this.state.mealID)
        // console.log(this.state.productID)
        return(
            
   <div className="products">

        
        {!this.state.MealEdit && !this.state.MealAdd && <div  className="MEALS_ProductSearch"> <MealsSearch setID = {this.setID.bind(this)} /> </div>}
        {!this.state.MealEdit && !this.state.MealAdd && <div className="MEALS_ProductInfo"> <MealsInfo setView={this.setView.bind(this)} MealID = {this.state.mealID}/></div>}
        {!this.state.MealEdit && !this.state.MealAdd && <div className = "MEALS_ProductPhoto" > <ProductPhoto changeView={this.changeView.bind(this)} API = {"http://localhost:8080/meal/"} productID={this.state.mealID} /></div>}
       
  
        {this.state.MealEdit && <div  className="MEALS_ProductSearch"> <ProductsSearch callback = {this.setProductsID.bind(this)} grams = {true}></ProductsSearch></div>}
        {this.state.MealEdit && <div  className="MEALS_Adding"> <MealsAdd setView={this.setView.bind(this)} wiadomoscSend={this.wiadomoscSend.bind(this)}  MealID = {this.state.mealID} productID = {this.state.productID} grams = {this.state.grams}></MealsAdd></div>}
        
        {this.state.MealAdd && <div  className="MEALS_ProductSearch"> <ProductsSearch callback = {this.setProductsID.bind(this)} grams = {true}></ProductsSearch></div>}
        {this.state.MealAdd && <div  className="MEALS_Adding"> <MealsAdd setView={this.setView.bind(this)} wiadomoscSend={this.wiadomoscSend.bind(this)} MealID = {undefined} productID = {this.state.productID} grams = {this.state.grams}></MealsAdd></div>}
        

      

    </div>
        )
    }
         
}
     export default Meals;