import { useContext } from "react";
import { MyContext } from "./MyContext";
import { useNavigate } from "react-router-dom";

export default function TopNav() {
  const { itemCount } = useContext(MyContext);
  const navigate = useNavigate();

  const totalItemCounts = Object.values(itemCount).reduce(
    (acc, count) => acc + count,
    0
  );

  return (
    <>
      <div className="flex justify-between gap-14 items-center bg-pink-300 fixed w-full h-16">
        <div className="max-sm:flex items-center pl-2 pt-1 gap-2 sm:flex items-center pl-2 pt-1 gap-2">
          <img
            onClick={() => navigate("/")}
            className="max-sm:cursor-pointer rounded-full w-[35px] h-[35px] sm:cursor-pointer rounded-full w-[48px] h-[48px]"
            src="https://img.icons8.com/external-filled-outline-02-chattapat-/64/external-skateboard-sales-filled-outline-02-chattapat-.png"
            alt="external-skateboard-sales-filled-outline-02-chattapat-"
          />
          <div
            onClick={() => navigate("/")}
            className="max-sm:cursor-pointer flex items-center text-3xl sm:cursor-pointer flex items-center gap-2 text-3xl"
          >
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
        <div className="max-sm:hidden flex gap-3 items-center my-3 bg-gray-200 rounded-md max-w-[40rem] w-full p-1">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios/50/search--v1.png"
            alt="search--v1"
          />
          <input
            className="outline-0 bg-gray-200 rounded-md w-full max-w-[40rem]"
            type="text"
            placeholder="Search"
          ></input>
        </div>
        <div className="flex items-center gap-4 mr-3">
          <img
            className="max-sm:flex"
            width="30"
            height="30"
            src="https://img.icons8.com/ios/50/search--v1.png"
            alt="search--v1"
          />
          <div
            onClick={() => navigate("/viewcart")}
            className="relative cursor-pointer flex items-center gap-1 shrink-0"
          >
            <img
              className="max-lg:w-[35px] max-lg:h[35px] w-[35px] h[35px]"
              src="https://img.icons8.com/ios/50/shopping-cart--v1.png"
              alt="shopping-cart--v1"
            />
            <nav className="max-lg:flex max-sm:hidden cursor-pointer">Cart</nav>
            {totalItemCounts > 0 ? (
              <span className="right-6 max-sm:right-0 absolute top-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItemCounts}
              </span>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <img
              className="max-lg:w-[25px] max-lg:h[25px] w-[35px] h[35px]"
              src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png"
              alt="user-male-circle"
            />
            <nav className="max-lg:flex max-sm:hidden">User</nav>
          </div>
        </div>
      </div>
    </>
  );
}