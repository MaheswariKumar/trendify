import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MyContext } from "./MyContext";

export default function MainPage() {
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
  
    useEffect(()=> {
      fetchProducts();
    }, [])

    function handleAddtoCart(prodID) {
        setItemCount((prevCounts) => ({
            ...prevCounts,
             [prodID] : (prevCounts[prodID] || 0)+1
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
        <div className="pl-6 pt-24 w-full flex gap-12 flex-wrap bg-pink-200">
        {getData.map((data) => (
        <div key={data.id} className="w-64 bg-pink-200 border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="flex-shrink-0">
                <img className="w-full h-56 object-fill" src={data.image} alt="Product Image"/>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-2 truncate">{data.title}</h2>
                    <p className="text-gray-600 mb-2 truncate">{data.description}</p>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold">&#8377;{`${data.price}`}</span>
                        <span className="text-sm text-gray-500">{data.rating.rate}</span>
                    </div>
                </div>
                {itemCount[data.id] > 0 ? <div className="flex items-center justify-between">
                    <button className="px-4 py-2 bg-[#113155] text-white font-semibold rounded hover:bg-blue-600 transition duration-300 mt-auto">Go to Cart</button>
                    <div className="flex gap-1">
                        <button className="bg-[#113155] px-3 text-white" onClick={() => handleDecButton(data.id)}>-</button>
                        <nav className="text-xl">{itemCount[data.id]}</nav>
                        <button className="bg-[#113155] px-3 text-white" onClick={() => handleIncButton(data.id)}>+</button>
                    </div>
                    </div> : 
                <button onClick={() => handleAddtoCart(data.id)} className="w-full py-2 bg-[#113155] text-white font-semibold rounded hover:bg-blue-600 transition duration-300 mt-auto">Add to Cart</button>}
            </div>
        </div>
    ))}
        </div>
        </>
    )
}