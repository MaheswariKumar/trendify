import { useState, useEffect } from "react";
import axios from "axios";

export default function MainPage() {
    const [getData, setGetData] = useState([]);

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
                        <span className="text-lg font-bold">{`$${data.price}`}</span>
                        <span className="text-sm text-gray-500">{data.rating.rate}</span>
                    </div>
                </div>
                <button className="w-full py-2 bg-[#113155] text-white font-semibold rounded hover:bg-blue-600 transition duration-300 mt-auto">Add to Cart</button>
            </div>
        </div>
    ))}
        </div>
        </>
    )
}