
import React from 'react';
import './ProductInfo.css';
import { NavLink, Route} from 'react-router-dom';
var API = 'http://localhost:8080/product/';

var carbohydrates;
var proteins;
var fat;
var kcal;

class ProductsInfo extends React.Component {

    state = {
        product: "",
        productIDinput: -1,
        grams: ""
        
    }
    
    handleDataFetch = () => {
       let qwe = (this.props.productID > 0) ? this.props.productID : 1
        fetch('http://localhost:8080/product/'+qwe)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                product: data
            })
            console.log(this.state.product);
        })
        .catch(error => console.log(error + "cos nie tak"))
    }

    componentDidUpdate(){
        if (this.state.productIDinput == (this.props.productID))
        {
            console.log("dubel")
            
        }
        else{
        API = 'http://localhost:8080/product/'+this.props.productID
        this.state.productIDinput = this.props.productID
        this.handleDataFetch()
        }
    }
  
    sumakcal(){
       let kcal = this.state.product.carbohydrates*4+this.state.product.protein*4
       +this.state.product.fat*9;
       return (kcal > 0) ? kcal : 0;
    }

    round(n, k)
    {
    var factor = Math.pow(10, k);
    return Math.round(n*factor)/factor;
    }

    handlePrzeliczButton(){
        
        carbohydrates = this.round(this.state.product.carbohydrates*this.state.grams/100,1) ;
        proteins = this.round(this.state.product.protein*this.state.grams/100,1);
        fat = this.round(this.state.product.fat*this.state.grams/100,1);
        kcal = this.round(carbohydrates*4+proteins*4+fat*9,1);
        this.setState( {productIDinput: -1})
        
    }

     validateFloat = element => {
        let onlyDotregex = /^[0-9.]+$/
        return (!onlyDotregex.test(String(element)))
    }

    handleViewChange(){

        this.props.setView(false, true)
        
    }
    


  render(){
    //console.log('http://localhost:8080/product/' + this.props.productID)
    console.log(this.state.grams)
    return(
        
    <div id="SRODKOWY">

    <div className="nazwa_wybranego_produktu">{this.state.product.name}</div>
        <div className="wybrane_produkty_label">Makro składniki na 100g:</div>

        <div className="opakowanie_makro">
        <div className="produkty">Węglowodany: <br></br> {this.state.product.carbohydrates} </div>
        <div className="produkty">Białko: <br></br> {this.state.product.protein} </div>
        <div className="produkty">Tłuszcze: <br></br> {this.state.product.fat} </div>
          <div className="produkty">kcal <br></br> {this.sumakcal()}</div>
        </div>

        <div className="wybrane_produkty_label_nowa_wartosc">Ilość gram:</div>
        <div  onInput={(e) => (this.setState({ grams:  e.target.value}))} className="produkty_gram_przelicznik"> <input  className="input" id="produkty_gram_input"></input>
        </div>
        <div className="produkty_gram_przelicznik" >
            <input onClick={() => this.handlePrzeliczButton()} id="produkty_gram_przelicznik_submit" type="submit" value="Oblicz"></input>
        </div>
        {this.validateFloat(this.state.grams) && <div className="error" id="produkty_gram_przelicznik_error">Błędna wartość!</div>}

        <div className="opakowanie_makro">
    <div className ="produkty" id="produkty_weglowodany_nowa_wartosc">Węglowodany: <br></br> {carbohydrates} </div>
        <div className ="produkty" id="produkty_bialko_nowa_wartosc">>Białko: <br></br> {proteins} </div>
        <div className ="produkty" id="produkty_tluszcze_nowa_wartosc">Tłuszcze: <br></br> {fat} </div>
        <div className ="produkty" id="produkty_kcal_nowa_wartosc">kcal <br></br> {kcal} </div>
        
     

        </div>
        <div className="przycisk_prod_info" id="produkt_edytuj">
        <a onClick={() => this.handleViewChange() } to="Edytuj">Edytuj produkty</a>
        </div>

        <div className="przycisk_prod_info" id="produkt_dodaj">
            <NavLink to="Dodaj_Produkt">Dodaj nowy produkt</NavLink>
        </div>
</div>
    )

  }
}
export default ProductsInfo;