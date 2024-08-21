import axios from 'axios';
import './App.css';
import { useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import TopNav from './TopNav';
import { MyContext } from './MyContext';
import CartItems from './CartItems';


function App() {
  const [itemCount, setItemCount] = useState({});
  const [getData, setGetData] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showMessage, setShowMessage] = useState("Item added to you cart");
  
  async function fetchProducts() {
    try {
        const data = await axios.get("https://fakestoreapi.com/products");
        setGetData(data.data);
        console.log(getData);
    }
    catch(err) {
        console.log(err);
    }
}

useEffect(()=> {
  fetchProducts();
}, [])

function handleShowPopUp() {
  setShowPopUp(true);
  setTimeout(()=> {
    setShowPopUp(false);
    setShowMessage("Item added to you cart")
  }, 1000)
}

  return (
    <>
    <BrowserRouter>
          <MyContext.Provider value={{itemCount, setItemCount, getData, handleShowPopUp, setShowMessage}}>
          <TopNav />
    <Routes>


        <Route path='/' element={<Dashboard />} />
        <Route path='/viewcart' element={<CartItems />} />

    </Routes>
{showPopUp &&     <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 font-bold flex items-center bg-gradient-to-r from-pink-400 to-purple-600 text-black py-3 px-5 rounded-lg shadow-lg animate-slide-up z-50">
  <span className="mr-2">🛒</span>
  <span>{showMessage}</span>
</nav>}
    </MyContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
