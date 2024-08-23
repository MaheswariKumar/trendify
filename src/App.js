import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import TopNav from "./component/TopNav";
import { MyContext } from "./component/MyContext";
import CartItems from "./component/CartItems";

function App() {
  const [itemCount, setItemCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [getData, setGetData] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showMessage, setShowMessage] = useState("Item added to you cart");

  async function fetchProducts() {
    try {
      const data = await axios.get("https://fakestoreapi.com/products");
      setGetData(data.data);
      setLoading(false);
      console.log(getData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleShowPopUp() {
    setShowPopUp(true);
    setTimeout(() => {
      setShowPopUp(false);
      setShowMessage("Item added to you cart");
    }, 1000);
  }

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider
          value={{
            itemCount,
            setItemCount,
            getData,
            handleShowPopUp,
            setShowMessage,
            loading,
          }}
        >
          <TopNav />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/viewcart" element={<CartItems />} />
          </Routes>
          {showPopUp && (
            <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 font-bold flex items-center bg-gradient-to-r from-pink-400 to-purple-600 text-black py-3 px-5 rounded-lg shadow-lg animate-slide-up z-50">
              <span className="mr-2">🛒</span>
              <span>{showMessage}</span>
            </nav>
          )}
        </MyContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;