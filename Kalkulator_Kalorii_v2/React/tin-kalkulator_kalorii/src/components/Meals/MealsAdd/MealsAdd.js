
import './MealsAdd.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Select_option_creator from './../../Products/ProductsSearch/Select_option_creator'
var src = "http://localhost:8080/images/"
var meal_products_actual = new Array();

class MealsAdd extends React.Component {

    state = {
        product: "",
        meal: "",
        mealIDinput: -1,
        grams: "",
        LoadData: false,
        meal_products_map: '',
        gramsinput: -1,
        productIDinput: -1,
        name: "",
        opis: "",
        photo_file: "",
        photo: "",

        errors: {
            name: false,
            photo: false,
            opis: false,
            gramy: false

        },

        messages: {
            name: "Błąd w nazwie posiłku",
            photo: "Błąd w zdjęciu",
            opis: "Błąd w opisie",
            gramy: "Brak wybranej wartości"
        }


    }




    loadProductData = () => {
        //console.log("wchdoze do ladowania danych")
        if (!(this.state.meal.meal_products === undefined)) {
            console.log("jestem")
            this.state.meal.meal_products.map(meal_products =>
                (
                    meal_products_actual.push(meal_products)

                )

            );
            console.log("pusznalem produkty")
            this.render();
        }
    };

    handleDataFetch = () => {
        let qwe = (this.props.MealID > 0) ? this.props.MealID : undefined
        // console.log("wchodze do fetacha")
        fetch('http://localhost:8080/meal/' + qwe)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                this.setState({
                    meal: data,
                    LoadData: true
                })
                // console.log("MEAL w ADD");
                // console.log(this.state.meal);


            })
            .catch(error => console.log(error + "cos nie tak"))

        return true;
    }

    componentDidUpdate() {
        if (this.state.mealIDinput == (this.props.MealID)) {
            //console.log("dubel")
        }
        else {
            this.state.mealIDinput = this.props.MealID
            this.handleDataFetch()

            if (!(meal_products_actual === undefined) && !(meal_products_actual.length > 0)) {
                this.loadProductData();
                //console.log("zaladowano dane")
            }
        }

        if (this.props.grams == this.state.gramsinput && this.props.productID == this.state.productIDinput) {
            //console.log("produkt dubel")
        }
        else {
            if (this.props.grams > 0 && (parseFloat(this.props.productID) > 0)) {
                this.state.gramsinput = this.props.grams
                this.state.productIDinput = this.props.productID
                this.handleProductDataFetch();
            }
        }


    }

    productPUSH() {
        console.log("PRODUKT ID JAKI WSZEDL" + this.props.productID)
        console.log("PRODUKT GRAMY JAKI WSZEDL" + this.props.grams)
        console.log(this.props.grams > 0)
        console.log(parseFloat(this.props.productID) > 0)


        this.pushProduct(parseFloat(this.state.product.id), this.state.gramsinput, this.state.product.name)

    }

    componentDidMount() {


        this.handleDataFetch();
        // console.log("zaladowano dane" + this.state.meal)
        // console.log(this.state.meal);
        this.loadProductData();
        // console.log("zaladowano dane" + meal_products_actual);
        // console.log(meal_products_actual);
        meal_products_actual = new Array();
        if ((this.props.MealID === undefined)) {
            this.setState({
                name: "",
                opis: "",
                photo: "",
                meal: ""
            })
        }


    }


    deleteProduct(product_id) {

        this.changeLoadState();
        let index = meal_products_actual.findIndex(i => { return i.product.id == product_id });
        //console.log(`indeks`+index)
        if (index >= 0) {
            meal_products_actual.splice(index, 1);
        }
        //console.log(meal_products_actual.length)

        this.changeLoadState2();
    }

    changeLoadState() {

        this.setState({
            LoadData: false
        })

    }


    convertMaptoArray() {



    }

    changeLoadState2() {

        this.setState({
            LoadData: true
        })

    }

    pushProduct(product_id, grams, name) {
        this.changeLoadState();

        var to_add = { product: { id: product_id, name: this.state.product.name }, grams: grams };
        this.deleteProduct(product_id);
        meal_products_actual.push(to_add);

        this.setState({
            productIDinput: product_id,
            gramsinput: grams
        })

        this.changeLoadState2();
        return "pusznieto";
    }

    create_meal_productJSON() {
        let temp = {};
        meal_products_actual.forEach(e => {

            temp[parseInt(e.product.id)] = String(e.grams)
        })

        this.setState({
            meal_products_map: temp
        })
        console.log(this.state.meal_products_map)
        console.log(JSON.stringify(temp))

        return temp;
    }

    formAccept(method) {

        const validation = this.formValidation()

        if (validation.correct || method == "DELETE") {
            this.form(method);

            this.setState({
                name: '',
                opis: '',
                photo: '',
                messages: "formularz wyslany",

                errors: {
                    name: false,
                    opis: false,
                    photo: false
                }
            }
            )
            this.render();

        }
        else {
            this.setState({
                errors: {
                    name: !validation.name,
                    opis: !validation.opis,
                    photo: !validation.photo
                }
            })
        }



    }

    handleProductDataFetch = () => {
        let qwe = (this.props.productID > 0) ? this.props.productID : 1
        fetch('http://localhost:8080/product/' + qwe)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    product: data
                })

                console.log("produkt pobraono");
                console.log(this.state.product);
                return true
            })
            .then(bool =>
                this.productPUSH())
            .catch(error => console.log(error + "cos nie tak"))
        return true;
    }


    form(inputmethod) {

        let formData = new FormData()
        var id = (inputmethod == "POST") ? "" : this.state.meal.id;


        //console.log("robie: "+inputmethod)
        var status_utworzenia_produktu = "";
        var productresponse = "";
        var product_response = "";
        var meal_prod = this.create_meal_productJSON();
        console.log("zaczynam fetch")

        fetch('http://localhost:8080/meal/' + id, {
            method: inputmethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: (this.state.name.length > 0) ? this.state.name : this.state.meal.name,
                opis: (this.state.opis.length > 0) ? this.state.opis : this.state.meal.opis,
                photoname: (this.state.photo.length > 0) ? this.state.photo : this.state.meal.photoname,
                mapa: meal_prod
            })
        }).then(response => {

            status_utworzenia_produktu = response.status;
            console.log(status_utworzenia_produktu)
            return response.text()
        })

            .then((response) => {
                product_response = response
                console.log(product_response)
                return response

            })
            .then((response) => {
                productresponse = response
            }).then(formData.append("files", this.state.photo_file))
            .then(x => {
                console.log(formData)
                return (status_utworzenia_produktu == 201 || status_utworzenia_produktu == 200)
            })
            .then(bool => {
                if (bool) {
                    fetch(`http://localhost:8080/product/ImageInput`, {
                        method: 'post',
                        header: { 'Content-Type': 'multipart/form-data' },
                        body: formData
                    }).then(response => response.text())
                        .then((response) => {
                            console.log(response)
                            //return productresponse
                        })
                }
            }).then(data => {

                this.props.wiadomoscSend(product_response);
            }
            )

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
        else if (type === "file") {
            const photo_name = e.target.files[0].name ? e.target.files[0].name : null;
            const photo_file = e.target.files[0] ? e.target.files[0] : null;
            console.log(photo_file)
            this.setState({
                [name]: photo_name,
                photo_file: photo_file

            })
        }

        console.log("zmienilem: " + this.state.name)
    }




    validators = {

        nameValidator(input) {
            if (input.length > 3) {
                return true
            }
            else {


                return false
            }
        },

        opisValidator(input) {
            if (input.length > 10) {
                return true
            }
            else {
                return false
            }
        },

        photoValidator(input) {
            if (input.length > 1) {
                var re = /^.+\.(([jJ][pP][gG]))$/;
                return re.test(input);
            }
            else {
                return true
            }
        }

    }

    formValidation() {
        // true - ok
        // false - zle
        let name = false;
        let opis = false;
        let photo = false;
        let correct = false;

        name = this.validators.nameValidator(this.state.name)
        opis = this.validators.opisValidator(this.state.opis)
        photo = this.validators.photoValidator(this.state.photo)

        if (name && opis && photo) {
            correct = true
        }

        return ({
            name,
            opis,
            photo,
            correct

        })
    }



    render() {

        //  console.log("Wchodzę do rendera");

        //  console.log(this.state.meal);
        // console.log(meal_products_actual);

        return (
            <div id="MealsAdd">
                <div id="MealsAddSRODKOWY">


                    <div className="MealsAdd_nazwa_posilku_label">
                        <input type="text" placeholder={this.state.meal.name} name="name" onChange={this.handleChange} type="input"></input> </div>

                    <div id="MealsAdd_tablica_z_wartosciami">
                        <table className="MealsAdd_ingredients-table">
                            <thead>
                                <tr>
                                    <th>Produkt</th>
                                    <th>Ilośc [g]</th>
                                    <th>Usuń</th>
                                </tr>


                                {/* {this.state.LoadData && this.optionCreator} */}
                                {this.state.LoadData && <Select_option_creator mealadd={true} meal={this.state.meal} meal_products_actual={meal_products_actual} deletingProduct={this.deleteProduct.bind(this)} ></Select_option_creator>}

                            </thead>
                            <tbody id="tbody_ingredients">

                            </tbody>
                        </table>
                    </div>



                    <div className="MealsAdd_textdiv">
                        <input type="text" name="opis" placeholder={this.state.meal.opis} onChange={this.handleChange} className="MealsAdd_textarea" >
                        </input>
                    </div>


                    <div className="MEALSAdd_produkty_nowa_wartosc" id="produkty_weglowodany_nowa_wartosc">Węglowodany: 0 </div>
                    <div className="MEALSAdd_produkty_nowa_wartosc" id="produkty_bialko_nowa_wartosc">Białko: 0 </div>
                    <div className="MEALSAdd_produkty_nowa_wartosc" id="produkty_tluszcze_nowa_wartosc">Tłuszcze: 0  </div>
                    <div className="MEALSAdd_produkty_nowa_wartosc" id="produkty_kcal_nowa_wartosc">kcal 0</div>

                </div>


                <div id="MEalsAddPRAWY">



                    <div className="MealsAdd_label_dodajzdjecie">Dodaj zdjęcie:</div>
                    <div className="MealsAdd_zdjecie_label_input">
                        <input type="file" name="photo" onChange={this.handleChange} id="zdjecie_label_input" type="file"
                            className="MealsAdd_input"></input>
                    </div>


                    <div className="MealsAdd_zdjecie">
                        {(this.props.MealID > 0) && <img id="MealsAdd_zdjecie_wczytane" src={src + this.state.meal.photoname} alt="ananas-zdjecie" />}
                    </div>


                    {this.state.errors.name && <div id="zdjecie_error" className="error"> {this.state.messages.name}</div>}
                    {this.state.errors.photo && <div id="zdjecie_error" className="error"> {this.state.messages.photo}</div>}
                    {this.state.errors.opis && <div id="zdjecie_error" className="error"> {this.state.messages.opis}</div>}


                    <div className="MealsAdd_button">


                        {(this.props.MealID > 0) && <a onClick={() => this.formAccept("PUT")} id="posilek_dodaj" href="#top">Edytuj Posiłek</a>}
                        {(this.props.MealID === undefined) && <a classname="MealADD_a" onClick={() => this.formAccept("POST")} id="posilek_dodaj" href="#top">Dodaj Posiłek</a>}

                    </div>

                    <div id="produkt_usun" className="MealsAdd_button">
                        {(this.props.MealID > 0) && <a classname="MealADD_a" onClick={() => this.formAccept("DELETE")} id="usun_posilek" href="#">Usuń Posiłek</a>}
                    </div>

                    <div className="MealsAdd_button">
                        <a classname="MealADD_a" onClick={() => this.props.setView(false, false)} >powrót</a>
                    </div>

                </div>

            </div>

        )
    }


}

export default MealsAdd;
