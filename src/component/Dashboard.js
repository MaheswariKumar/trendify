import { useState, useEffect, useContext } from "react";
import { MyContext } from "./MyContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { getData, itemCount, setItemCount, handleShowPopUp, loading } =
    useContext(MyContext);
  const navigate = useNavigate();

  function handleAddtoCart(prodID) {
    setItemCount((prevCounts) => ({
      ...prevCounts,
      [prodID]: (prevCounts[prodID] || 0) + 1,
    }));
  }

  function handleIncButton(prodID) {
    setItemCount((prevCounts) => ({
      ...prevCounts,
      [prodID]: (prevCounts[prodID] || 0) + 1,
    }));
  }

  function handleDecButton(prodID) {
    setItemCount((prevCounts) => {
      const updateCount = (prevCounts[prodID] || 0) - 1;
      if (updateCount <= 0) {
        return {
          ...prevCounts,
          [prodID]: 0,
        };
      }

      return {
        ...prevCounts,
        [prodID]: updateCount,
      };
    });
  }

  return (
    <>
      <div className="pt-24 w-full flex justify-center items-center gap-12 max-sm:gap-4 flex-wrap bg-pink-200 min-h-[100vh]">
        {loading ? (
          <svg class="circular-loader" viewBox="25 25 50 50">
            <circle
              class="loader-path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#70c542"
              stroke-width="4"
            />
          </svg>
        ) : (
          <>
            {getData.map((data) => (
              <div
                key={data.id}
                className="w-64 max-sm:w-[9rem] max-lg:w-[18rem] bg-pink-200 border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col"
              >
                <div className="flex-shrink-0">
                  <img
                    className="w-full h-56 max-sm:h-32 object-fill"
                    src={data.image}
                    alt="Product Image"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl max-sm:text-sm font-semibold mb-2 truncate">
                      {data.title}
                    </h2>
                    <p className="text-gray-600 mb-2 truncate">
                      {data.description}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg max-sm:text-sm font-bold">
                        &#8377;{`${data.price}`}
                      </span>
                      <span className="text-sm text-gray-500">
                        {data.rating.rate}
                      </span>
                    </div>
                  </div>
                  {itemCount[data.id] > 0 ? (
                    <div className="flex items-center gap-2 justify-between">
                      <button
                        onClick={() => navigate("/viewcart")}
                        className="px-4 max-sm:text-[12px] max-sm:p-1 py-2 bg-[#113155] text-white font-semibold rounded hover:bg-blue-600 transition duration-300 mt-auto"
                      >
                        Go to Cart
                      </button>
                      <div className="flex gap-1">
                        <button
                          className="bg-[#113155] px-3 max-sm:px-1 text-white"
                          onClick={() => handleDecButton(data.id)}
                        >
                          -
                        </button>
                        <nav className="text-xl max-sm:text-sm">
                          {itemCount[data.id]}
                        </nav>
                        <button
                          className="bg-[#113155] px-3 text-white max-sm:px-1"
                          onClick={() => {
                            handleIncButton(data.id);
                            handleShowPopUp();
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleAddtoCart(data.id);
                        handleShowPopUp();
                      }}
                      className="w-full py-2 bg-[#113155] text-white max-sm:text-sm font-semibold rounded hover:bg-blue-600 transition duration-300 mt-auto"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}