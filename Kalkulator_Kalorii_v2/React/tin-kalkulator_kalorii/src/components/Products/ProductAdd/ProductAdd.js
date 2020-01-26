import React from 'react';
import './ProductAdd.css';

import { NavLink} from 'react-router-dom';

class ProductAdd extends React.Component {


    state = {
        name: '',
        carbohydrates: '',
        proteins: '',
        fat: '',
        category: '',
        photo: '',
        photo_file: '',

        errors: {
            name: false,
            carbohydrates: false,
            proteins: false,
            fat: false,
            category: false,
            photo: false
        }
    }

    messages = {
        name: 'Zbyt krótka nazwa',
        carbohydrates_incorrect: 'Błędna ilość',
        proteins_incorrect: 'Błędna ilość',
        fat_incorrect: 'Błędna ilość',
        category_incorrect: 'Nie wybrana kategoria',
        photo_incorrect: 'Błąd w zdjęciu'
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
        } else if (type === "file") {
            const photo_name = e.target.files[0].name ? e.target.files[0].name : null ;
            const photo_file = e.target.files[0] ? e.target.files[0] : null ;
            console.log(photo_file)
            this.setState({
                [name]: photo_name,
                photo_file : photo_file
               
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

    handleSubmit = (e) => {

      
        const validation = this.formValidation()
        console.log(validation)

        if (validation.correct) {

            this.formPOST();
            //console.log("wyslalem post bede zerowal")
            this.setState({
                name: '',
                carbohydrates: '',
                proteins: '',
                fat: '',
                category: '',
                photo: '',
                messages: "formularz wyslany",

                errors: {
                    name: false,
                    carbohydrates: false,
                    proteins: false,
                    fat: false,
                    category: false,
                    photo: false
                }
            }
            )
            this.render();
        } else {
              this.setState({
                errors: {
                    name: !validation.name,
                    carbohydrates: !validation.carbohydrates,
                    proteins: !validation.proteins,
                    fat: !validation.fat,
                    category: !validation.category,
                    photo: !validation.photo
                }
              })
        }
    }

    componentDidUpdate() {
        console.log("update");
        if (this.state.message !== '') {
          setTimeout(() => this.setState({
            message: ''
          }), 3000)
        }
      }


    validators = {

        nameValidator(input) {
            if (input.length > 3 && input.indexOf(' ') === -1){
                return true
            }
            else{
                
                    
                return false
            }
        },

        gramsValidator(input) {
            console.log("grams: " + input)
            if (input > 0 && input < 100)
                return true
            else
                return false
        },


        categoryValidator(input){
            if(input > 0 && input < 50 )
                 return true
            else
                return false
        },

        photoValidator(input){
            var re = /^.+\.(([jJ][pP][gG]))$/;
            if(re.test(input))
                 return true
            else
                return false
        }


    }

    formPOST(){

        var status_utworzenia_produktu;
        let formData = new FormData()
        let productresponse = '';

        fetch('http://localhost:8080/product/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: this.state.name,
                carbohydrates: this.state.carbohydrates,
                protein: this.state.proteins,
                fat: this.state.fat,
                category: this.state.category,
                photoname: this.state.photo,
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
         .then( bool => {
             if(bool){
         fetch(`http://localhost:8080/product/ImageInput`, {
            method: 'post',
            header: {'Content-Type':'multipart/form-data'},
            body: formData
        }).then(response => response.text())
        .then((response) => {
            console.log(productresponse)
           //return productresponse
        })
    }}).then( data => {
       
            this.props.history.push({
                pathname: '/wiadomosc',
                message: productresponse
            })
            } 
        )


    }


    formValidation() {
        // true - ok
        // false - zle
        let name = false;
        let carbohydrates = false;
        let proteins = false;
        let fat = false;
        let category = false;
        let photo = false;
        let correct = false;  

        name = this.validators.nameValidator(this.state.name)
        carbohydrates = this.validators.gramsValidator(parseFloat(this.state.carbohydrates))
        proteins = this.validators.gramsValidator(this.state.proteins)
        fat = this.validators.gramsValidator(this.state.fat)
        category = this.validators.categoryValidator(this.state.category)
        photo = this.validators.photoValidator(this.state.photo)

        if (name && carbohydrates && proteins && fat && category && photo) {
            correct = true
        }

        return ({
            name,
            carbohydrates,
            proteins,
            fat,
            category,
            photo,
            correct

        })
    }

    
    render() {

        // console.log(this.state.name)
        // console.log(this.state.carbohydrates)
        // console.log(this.state.proteins)
        // console.log(this.state.fat)
        // console.log(this.state.category)
        // console.log(this.state.photo)
        console.log(this.state.photo_file)
        console.log(this.state.photo)

        return (

            <div className="productsadd" >
                <div className="grid-container">
                    <div className="Dodaj_produkt_label"> Dodaj produkt </div>
                    <div className="nazwa_label"> Nazwa </div>
                    <div className="wegle_label"> Węglowodany/100g</div>
                    <div className="bialko_label"> Białko/100g </div>
                    <div className="tluszcze_label"> Tłuszcze/100g </div>
                    <div className="kategoria_label"> Kategoria </div>
                    <div className="zdjecie_label"> Zdjęcie </div>

                    {this.state.errors.name && <div className="error" id="nazwa_label_error"> {this.messages.name}</div>}

                    {this.state.errors.carbohydrates && <div className="error" id="wegle_label_error"> {this.messages.carbohydrates_incorrect}</div>}
                    {this.state.errors.proteins && <div className="error" id="bialko_label_error"> {this.messages.proteins_incorrect}</div>}
                    {this.state.errors.fat && <div className="error" id="tluszcze_label_error"> {this.messages.fat_incorrect}</div>}
                    {this.state.errors.category && <div className="error" id="kategoria_label_error"> {this.messages.category_incorrect}</div>}
                    {this.state.errors.photo && <div className="error" id="zdjecie_label_error"> {this.messages.photo_incorrect}</div>}
                    {/* 
                    <div className="error" id="dodawanie_label_error"> błąd w dodawaniu produktu </div> */}

                  

                    <div className="nazwa_label_input" > <input type="text" name="name" id="nazwa_label_input" className="input" onChange={this.handleChange} ></input> </div>
                    <div className="wegle_label_input" > <input type="text" name="carbohydrates" id="wegle_label_input" className="input" onChange={this.handleChange}></input> </div>
                    <div className="bialko_label_input"  > <input type="text" name="proteins" id="bialko_label_input" className="input" onChange={this.handleChange}></input> </div>
                    <div className="tluszcze_label_input" > <input type="text" name="fat" id="tluszcze_label_input" className="input" onChange={this.handleChange}></input> </div>
                    <div className="kategoria_label_input">
                        <select type="select" name="category" id="kategoria_label_input" onChange={this.handleChange}>
                            <option value="brak_ketegorii">...</option>
                            <option value="1">kategoria1</option>
                            <option value="2">kategoria2</option>
                            <option value="3">kategoria3</option>
                        </select>
                    </div>
                    <div className="zdjecie_label_input">  <input name="photo" type="file" name="photo" className="PRODUCT_ADD_input" id="zdjecie_label_input" onChange={this.handleChange} >
                    </input> </div>

                    <div className="PRODUKT_ADD_produkt_powrot">
                    <NavLink to="/Produkty" exact>powrót</NavLink>
                    </div>

                    <div className="PRODUKT_ADD_produkt_dodaj">
                        <a onClick={() => this.handleSubmit()} id='produkt_dodaj' href="#top" type="submit">Dodaj produkt</a>
                    </div>

                </div>
            </div>
        )
    }

}

export default ProductAdd