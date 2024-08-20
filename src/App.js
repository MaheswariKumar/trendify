import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import NavBar from './NavBar';
import { MyContext } from './MyContext';
import CartItems from './CartItems';


function App() {
  const [itemCount, setItemCount] = useState({});

  return (
    <BrowserRouter>
          <MyContext.Provider value={{itemCount, setItemCount}}>
          <NavBar />
    <Routes>


        <Route path='/' element={<MainPage />} />
        <Route path='/viewcart' element={<CartItems />} />

    </Routes>
    </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
