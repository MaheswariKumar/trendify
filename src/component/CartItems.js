import { useContext } from "react";
import { MyContext } from "./MyContext";


export default function CartItems() {
  // Destructure the necessary values and functions from the context.
  const { getData, itemCount, setItemCount, handleShowPopUp, setShowMessage } = useContext(MyContext);

  // Filter products that have a quantity greater than 0 in the cart.
  const cartItems = getData.filter((product) => itemCount[product.id] > 0);

  // Calculate the total price of items in the cart.
  const totalPrice = cartItems
    .map((product) => product.price * itemCount[product.id])
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  // Calculate the total amount after applying a 10% discount.
  const totalAmt = (totalPrice - totalPrice * 0.1).toFixed(2);

  // Handler to remove an item from the cart by setting its count to 0.
  function handleRemButton(prodID) {
    setItemCount((prevCounts) => ({
      ...prevCounts,
      [prodID]: 0,
    }));
  }

  // Handler to increase the quantity of an item in the cart.
  function handleIncButton(prodID) {
    setItemCount((prevCounts) => ({
      ...prevCounts,
      [prodID]: (prevCounts[prodID] || 0) + 1,
    }));
  }

  // Handler to decrease the quantity of an item in the cart, ensuring it doesn't go below 0.
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
      {/* Main container for the cart items and price details */}
      <div className="pt-24 w-full flex justify-center bg-pink-200 min-h-[100vh]">
        <div className="flex max-sm:flex-col gap-6 w-full bg-pink-200 justify-center pl-4">
          <div className="flex flex-col gap-6">
            {cartItems.length > 0 ? (
              cartItems.map((data) => (
                <div
                  key={data.id}
                  className="w-[50rem] border max-sm:w-[20rem] max-lg:w-[40rem] border-gray-200 rounded-lg shadow-lg overflow-hidden flex p-4"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-24 h-24 max-sm:w-20 h-20 object-cover"
                      src={data.image}
                      alt="Product Image"
                    />
                  </div>
                  <div className="flex-1 ml-4 flex flex-col justify-between overflow-hidden max-sm:overflow-hidden">
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
                    {itemCount[data.id] > 0 && (
                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={() => handleRemButton(data.id)}
                          className="px-4 max-sm:p-1 max-sm:text-sm py-2 bg-[#113155] text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
                        >
                          Remove
                        </button>
                        <div className="flex gap-1 items-center">
                          <button
                            className="bg-[#113155] px-3 max-sm:px-1 text-white"
                            onClick={() => handleDecButton(data.id)}
                          >
                            -
                          </button>
                          <span className="text-xl max-sm:text-sm">
                            {itemCount[data.id]}
                          </span>
                          <button
                            className="bg-[#113155] px-3 max-sm:px-1 text-white"
                            onClick={() => {
                              handleIncButton(data.id);
                              handleShowPopUp();
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              // Display message when no items are in the cart
              <>
                <div className="w-[50rem] border max-sm:w-[20rem] max-lg:w-[40rem] border-gray-200 rounded-lg shadow-lg overflow-hidden flex items-center p-4">
                  <nav className="text-[#113155] font-bold text-lg">
                    Items yet to Add!!!
                  </nav>
                </div>
              </>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg shadow-2xl p-6 w-64 h-72 max-sm:w-[20rem] max-sm:h-[22rem]">
            <div className="flex flex-col">
              <h2 className="text-xl max-sm:text-lg font-semibold mb-6 text-gray-800">
                Price Details
              </h2>
              <div className="flex justify-between py-3 border-b border-gray-300">
                <span className="text-gray-700">Price</span>
                <span className="text-gray-800">&#8377;{totalPrice}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-300">
                <span className="text-gray-700">Discount</span>
                <span className="text-green-600">&#8377;10%</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-300">
                <span className="text-gray-700">Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between py-3 font-bold text-lg max-sm:text-md">
                <span className="text-gray-900">Total Amount</span>
                <span className="text-gray-900">&#8377;{totalAmt}</span>
              </div>
              <button
                onClick={() => {
                  handleShowPopUp();
                  setShowMessage("Placed your order successfully");
                }}
                className="mt-6 py-3 px-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}