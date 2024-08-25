E-commerce Application
This project is a responsive and interactive e-commerce application built with React. It allows users to browse products, add them to the cart, and place orders. The app is designed with a user-friendly interface and includes several key features.

Features
Product Listing:

The app fetches product data from the Fake Store API and displays it in a grid layout on the dashboard.
Each product card includes an image, title, description, price, and rating.
Add to Cart Functionality:

Users can add products to their cart directly from the product listing.
The cart button updates dynamically to show the number of items in the cart.
Cart Management:

Users can view all the items they have added to their cart on the cart page.
The cart page displays each product's details along with the quantity added.
Users can increase, decrease, or remove items from the cart.
Price Calculation:

The total price and discount (10%) are automatically calculated and displayed on the cart page.
Users can see the total amount after discount, along with a breakdown of the charges.
Order Placement:

After reviewing the cart, users can place their order by clicking the "Place Order" button.
A popup message confirms that the order was placed successfully.
Responsive Design:

The application is fully responsive, ensuring a seamless experience across different screen sizes.
The layout adjusts for mobile, tablet, and desktop views, including adaptive navigation and product displays.
Persistent State Management:

The app uses React's useContext and useState hooks to manage global state across components, including product data, cart items, and loading states.
Loading State:

While data is being fetched from the API, a loading spinner is displayed to indicate progress to the user.
Technologies Used
React for building the user interface.
React Router for client-side routing.
Axios for making HTTP requests to the Fake Store API.
Tailwind CSS for styling the components.
Context API for managing global state.