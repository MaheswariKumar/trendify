import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MyContext } from "./MyContext";


export default function CartItems() {
    const [getData, setGetData] = useState([]);
    const {itemCount, setItemCount} = useContext(MyContext);

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

    const cartItems = getData.filter(product => itemCount[product.id] > 0);
  
    useEffect(()=> {
      fetchProducts();
    }, [])

    function handleRemButton(prodID) {
        setItemCount((prevCounts) => ({
            ...prevCounts,
             [prodID] : 0
        }));
    }

    function handleIncButton(prodID) {
        setItemCount((prevCounts) => ({
            ...prevCounts,
            [prodID] : (prevCounts[prodID] || 0)+1
        }))
    }

    function handleDecButton(prodID) {
        setItemCount((prevCounts)=> {
            const updateCount = (prevCounts[prodID] || 0) -1
            if (updateCount <= 0) {
                return {
                    ...prevCounts,
                    [prodID] : 0
                }
            }

            return {
                ...prevCounts,
                [prodID] : updateCount
            }
        })
    }
    return (
<>
  <div className="pt-24 w-full flex justify-center bg-pink-200 min-h-[100vh]">
    <div className="flex gap-6 w-full bg-pink-200 justify-center">
      {/* Cart Items */}
      <div className="flex flex-col gap-6">
        {cartItems.length > 0 ? cartItems.map((data) => (
          <div key={data.id} className="w-[50rem] border border-gray-200 rounded-lg shadow-lg overflow-hidden flex items-center p-4">
            <div className="flex-shrink-0">
              <img className="w-24 h-24 object-cover" src={data.image} alt="Product Image"/>
            </div>
            <div className="flex-1 ml-4 flex flex-col justify-between overflow-hidden">
              <div>
                <h2 className="text-xl font-semibold mb-2 truncate">{data.title}</h2>
                <p className="text-gray-600 mb-2 truncate">{data.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold">&#8377;{`${data.price}`}</span>
                  <span className="text-sm text-gray-500">{data.rating.rate}</span>
                </div>
              </div>
              {itemCount[data.id] > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <button onClick={()=> handleRemButton(data.id)} className="px-4 py-2 bg-[#113155] text-white font-semibold rounded hover:bg-blue-600 transition duration-300">Remove</button>
                  <div className="flex gap-1 items-center">
                    <button className="bg-[#113155] px-3 text-white" onClick={() => handleDecButton(data.id)}>-</button>
                    <span className="text-xl">{itemCount[data.id]}</span>
                    <button className="bg-[#113155] px-3 text-white" onClick={() => handleIncButton(data.id)}>+</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )) : <><div className="w-[50rem] border border-gray-200 rounded-lg shadow-lg overflow-hidden flex items-center p-4">
            <nav className="text-[#113155] font-bold text-lg">Items yet to Add!!!</nav>
            </div></>}
      </div>

      {/* Price Details */}
      <div className="border border-gray-200 rounded-lg h-64 shadow-lg p-4">
        <div className="flex flex-col w-52">
          <h2 className="text-lg font-semibold mb-4">Price Details</h2>
          <div className="flex justify-between py-2 border-b border-gray-600">
            <span>Price</span>
            <span>&#8377;1000</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-600">
            <span>Discount</span>
            <span className="text-green-700">&#8377;100</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-600">
            <span>Delivery Charges</span>
            <span className="text-green-700">Free</span>
          </div>
          <div className="flex justify-between py-2 font-bold">
            <span>Total Amount</span>
            <span>&#8377;1000</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

    )
}