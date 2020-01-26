
import React from 'react';
import './ProductPhoto.css';
import {BrowserRouter, NavLink, Route} from 'react-router-dom';
var src = "http://localhost:8080/images/"
var API = 'http://localhost:8080/product/';

class ProductsPhoto extends React.Component {


    
    state = {
        product: "",
        productIDinput: -1
        
    }
    
    handleDataFetch = () => {
        let qwe = (this.props.productID > 0) ? this.props.productID : 1
        
        var APICALL = (this.props.API ? this.props.API : "lol").concat(qwe);
         fetch(APICALL)
         .then(response => response.json())
         .then(data => {
             //console.log(data);
             this.setState({
                 product: data
             })
            // console.log(this.state.product);
         })
         .catch(error => console.log(error + "cos nie tak"))
     }
 
 
 
     componentDidUpdate(){

        // console.log("input: "+this.state.productIDinput)
        // console.log("props: "+this.props.productID)
        // console.log("porownanie"+((this.state.productIDinput) == (this.props.productID) ))

         if (((this.state.productIDinput) == (this.props.productID)) )
         {

             //console.log("dubel")
             
         }
         else{
            //console.log("wykonalem API" )
         
         this.state.productIDinput = (this.props.productID)
         this.handleDataFetch()
         }
     }



render(){

console.log(this.state.product)

return(
<div>

<div className="zdjecie">
    <img id="image" src={src+this.state.product.photoname} alt="ananas-zdjecie" />
</div>

<div className="przycisk_prod_photo">
    <a onClick={() => this.props.changeView()} >powrót</a>
</div>


</div>
)
}
}


export default ProductsPhoto;