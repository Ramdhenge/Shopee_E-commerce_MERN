import './App.css';
import Category from './Components/Category';
import Home from './Components/Home';
import Nav from './Components/Nav';
import { Routes, Route } from 'react-router-dom'
import ProductState from './Context/ProductState';
import ViewProduct from './Components/ViewProduct';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Alert from './Components/Alert';
import { useState } from 'react';
import Mycart from './Components/Mycart';
import Footer from './Components/Footer';

function App() {

  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }

  return (
    <>
      <ProductState>
        <div>
          <Nav showAlert={showAlert} />
          <Alert alert={alert} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/category' element={<Category />} />
            <Route path='/viewproduct' element={<ViewProduct showAlert={showAlert} />} />
            <Route path='/signup' element={<Signup showAlert={showAlert} />} />
            <Route path='/login' element={<Login showAlert={showAlert} />} />
            <Route path='/mycart' element={<Mycart showAlert={showAlert} />} />
          </Routes>
          <Footer />
        </div>
      </ProductState>
    </>
  );
}

export default App;
