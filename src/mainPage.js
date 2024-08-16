import { useState, useEffect } from "react"

export default function MainPage() {
    const [getData, setGetData] = useState([]);

    async function getProd () {
        const data = await fetch('https://api.escuelajs.co/api/v1/products');
        const rs = data.json();
        console.log(rs);
    }

    useEffect(()=> {
        getProd();
    }, [])
    
    return (
        <>
        <h1>Hello</h1>
        </>
    )
}