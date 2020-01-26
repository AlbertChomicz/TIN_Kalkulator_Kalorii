import React from 'react';
import './MealsSearch.css';
import Select_option_creator from './../../Products/ProductsSearch/Select_option_creator'

class MealsSearch extends React.Component {

    state = {
        products: [],
        meals: [],
        selectedValue: 0,
        selectedItem: false,
        filteredproducts: []

    }
    
    
    handleDataFetch = () => {
        fetch("http://localhost:8080/meal/")
        .then(response => {
            if(response.ok){
                console.log(response)
                return response;
            }
            throw Error(response.status)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                meals: data,
                filteredproducts: data
            })
            //console.log(this.state.products);
        })
        .catch(error => console.log(error + "cos nie tak"))
    }

    componentDidMount(){
        this.handleDataFetch()
    }

    handleSelectedItem(){

    
        console.log(this.state.selectedValue)

        if (!(this.state.selectedValue > 0)){
            this.setState({
            selectedItem: true
                })
            }
        else{

            if(this.state.selectedItem != false){
            this.setState({
                selectedItem: false
        })}
        this.props.setID(this.state.selectedValue)
    }}


    productsFilter(e){
        console.log(e)

        var filtered = [];

        filtered = this.state.meals.filter(prod => {return prod.name.toLowerCase().includes(e.toLowerCase())})

        this.setState({
            filteredproducts: filtered
        })
        console.log(filtered);
    }


    // products = {this.state.products}

    render() {
        return(

    <div id="LEWY">
        
                <div id="label_wybierzprodukt">Wyszukiwarka:</div>
                {/* <select className="produkt_sort_select" id="produkt_sort_select">
                    <option value="data_utworzenia">Data Utworzenia</option>
                    <option value="nazwa">Nazwa</option>
                    <option value="kcal">KCAL/100g</option>
                </select>
                <div className="przycisk2">
                    <button id="sortuj_button">Sortuj</button>
                </div> */}

                <div className="przycisk2">
                    <input placeholder="Wpisz frazę" onChange={(e) => this.productsFilter(e.target.value)} ></input>
                </div>


                <div id="produkty_lista">
         
                    <select  onChange={(e) => (this.setState({ selectedValue:  e.target.value}))} className="lista_produktow" id="lista_produktow" multiple>
                    <Select_option_creator meal_bool = {true} meals = {this.state.filteredproducts}/>
                    </select>
                </div>
                <div className="przycisk">
                    <button id="wybierz_button" onClick={() => this.handleSelectedItem()}>Wybierz</button>
                </div>
                {this.state.selectedItem && <div id='wybierz_label_error' className="error" > Nie wybrano produktu </div>}
        </div>
        )
    }


}

export default MealsSearch;
