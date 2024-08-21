import { useEffect, useState, useContext } from "react"
import { MyContext } from "./MyContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [tabSize, setTabSize] = useState(true);
    const [MobSize, setMobSize] = useState(true);
    const {itemCount} = useContext(MyContext);
    const navigate = useNavigate();

    const totalItemCounts = Object.values(itemCount).reduce((acc, count)=> acc+count, 0);

    useEffect(()=> {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (windowWidth < 768) {
                setTabSize(false);
                setMobSize(false);
            }
            else if (windowWidth < 1098) {
                setTabSize(false);
                setMobSize(true);
            }
            else {
                setTabSize(true);
                setMobSize(true);
            }
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }

    }, [windowWidth])

    return (
        <>
        <div className="flex justify-between gap-14 items-center bg-pink-300 fixed w-full h-16">
            <div className={`${!MobSize ? "flex items-center pl-2 pt-1 gap-2" : "flex items-center pl-2 pt-1 gap-2"}`}>
                <img onClick={()=> navigate("/")} className={`${!MobSize ? "cursor-pointer rounded-full w-[35px] h-[35px]" : "cursor-pointer rounded-full w-[48px] h-[48px]"}`} src="https://img.icons8.com/external-filled-outline-02-chattapat-/64/external-skateboard-sales-filled-outline-02-chattapat-.png" alt="external-skateboard-sales-filled-outline-02-chattapat-"/>
                <div onClick={()=> navigate("/")} className={`${!MobSize ? "cursor-pointer flex items-center text-3xl" : "cursor-pointer flex items-center gap-2 text-3xl"}`}>
                    <nav className="trend">t</nav>
                    <nav className="trend">r</nav>
                    <nav className="trend">e</nav>
                    <nav className="trend">n</nav>
                    <nav className="trend">d</nav>
                    <nav className="trend">i</nav>
                    <nav className="trend">f</nav>
                    <nav className="trend">y</nav>
                </div>
            </div>
            <div className={`${!MobSize ? "hidden" : "flex gap-3 items-center my-3 bg-gray-200 rounded-md max-w-[40rem] w-full p-1"}`}>
                <img width="30" height="30" src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1"/>
                <input className="outline-0 bg-gray-200 rounded-md w-full max-w-[40rem]" type="text" placeholder="Search"></input>
            </div>
            <div className="flex items-center gap-4 mr-3">
                {!MobSize ? <img width="30" height="30" src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1"/> : null}
                <div onClick={()=> navigate("/viewcart")} className="relative cursor-pointer flex items-center gap-1 shrink-0">
                    <img className={`${!tabSize ? "w-[35px] h[35px]" : "w-[35px] h[35px]"}`} src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="shopping-cart--v1"/>
                    {tabSize ? <nav className="cursor-pointer">Cart</nav> : null}
                    {totalItemCounts > 0 ?                     <span className={`${!tabSize ? "right-0" : "right-6"} absolute top-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center`}>
                    {totalItemCounts}
                </span> : null}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                    <img className={`${!tabSize ? "w-[25px] h[25px]" : "w-[35px] h[35px]"}`} src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png" alt="user-male-circle"/>
                    {tabSize ? <nav>User</nav> : null}
                </div>
            </div>
        </div>
        </>
    )
}