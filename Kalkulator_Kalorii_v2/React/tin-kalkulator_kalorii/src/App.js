import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import {BrowserRouter, NavLink, Route} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

class App extends React.Component {
  
  render() {
    return(

  <CookiesProvider>
    <div>
      <Header ></Header>
      <NavBar></NavBar>
      <Footer></Footer>
      </div>
    </CookiesProvider>
    )
  };

}

export default App;
