import React from 'react';
import './NavBar.css';
import {BrowserRouter, NavLink, Route} from 'react-router-dom';
import Products from  './../Products/Products'
import ProductsInfo from '../Products/ProductsInfo/ProductInfo';
import ProductAdd from './../Products/ProductAdd/ProductAdd'
import MessageComponent from './../MessageComponent/MessageComponent'
import ProductEdit from './../Products/ProductEdit/ProductEdit'
import Meals from './../Meals/Meals'
import SignIN from './../Log-IN/SignIN'

const NavBar = props => (
    <div className = "navBar">
    
        <nav>
            <BrowserRouter>
			<NavLink to="/Main" exact>Główna</NavLink>
            <NavLink to="/Produkty" exact>Produkty</NavLink>
            <NavLink to="/Posilki" exact>Posiłki</NavLink>
            <NavLink to="/Registration" exact>Zarejestruj się!</NavLink>
            <NavLink to="/Zapotrzebowanie_kaloryczne" exact>Zapotrzebowanie kaloryczne</NavLink>
            <NavLink to="/pomysl_dnia" exact>Pomysł Dnia</NavLink>
            <NavLink to="/Artykuly" exact>Artykuły</NavLink>
            

            <Route path="/Posilki" component={Meals} />
            <Route path="/wiadomosc" component={MessageComponent} />
            <Route path="/ProductEdit" component={ProductEdit} />
            <Route path="/Produkty" component={Products} />
            <Route path="/Dodaj_Produkt" component={ProductAdd} />            
            <Route path="/ProductEdit" component={ProductEdit} />
            <Route path="/Registration" component={SignIN} />
 

            </BrowserRouter>
		</nav>

    </div>
     )


     export default NavBar;