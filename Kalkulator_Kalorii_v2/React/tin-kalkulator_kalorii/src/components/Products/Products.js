import React, { Component } from 'react';
import './Products.css';

import ProductsSearch from '../Products/ProductsSearch/ProdutsSearch'
import ProductInfo from '../Products/ProductsInfo/ProductInfo'
import ProductPhoto from '../Products/ProductsPhoto/ProductsPhoto'
 import ProductEdit from '../Products/ProductEdit/ProductEdit'

class Products extends React.Component {
   
    state = {
        productID: "",
        photoName: "",
        edit: false,
        productInfo: true
    }

    setProductID(id, grams){
        this.setState({
            productID: id
            })
        //console.log("jestem tu"+this.state.productID)
    }

    setView(prodbool, edytbool){
        this.setState({
            productInfo: prodbool,
            edit: edytbool
            })
        //console.log("jestem tu"+this.state.productID)
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
        
        console.log(this.state.productID)
        return(
   <div className="products">
        <div className="ProductSearch">< ProductsSearch callback={this.setProductID.bind(this)}/></div>
        {this.state.productInfo && <div className="ProductInfo"> <ProductInfo setView={this.setView.bind(this)} productID={this.state.productID}></ProductInfo></div>}
        {this.state.edit && <div className="ProductInfo"> <ProductEdit wiadomoscSend={this.wiadomoscSend.bind(this)} productID={this.state.productID}></ProductEdit></div>}
        <div className="ProductPhoto"> <ProductPhoto changeView={this.changeView.bind(this)} API = {"http://localhost:8080/product/"} productID={this.state.productID} ></ProductPhoto></div>
    </div>
        )
    }
         
}
     export default Products;