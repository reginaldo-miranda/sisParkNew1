/*import { BrowserRouter } from "react-router-dom";
import Home from './pages/Home/Home'
import Menu from './components/menu/menu'
import Header from './components/Header/Header'
import Routes from './components/Routes'

import './App.css'

function App() {


  return (
    <>
     <Routes/>
     <Header/>
     <Home/>
    </>
  )
}

export default App

*/
//---------------------------------------------------------//

import { BrowserRouter } from "react-router-dom";
import Home from './pages/Home/Home';
import Menu from './components/menu/menu';
import Header from './components/Header/Header';
import Routes from './components/Routes';
import Footer from './components/footer/footer';
 

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

