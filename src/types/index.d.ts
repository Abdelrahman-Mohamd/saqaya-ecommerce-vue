// Define the Product interface to strongly type product objects in the cart,
//  we chose to use an interface over a type alias for better extensibility
export interface Product {
  id: number; // Unique identifier for the product
  title: string; // Product name/title
  price: number; // Product price
  description: string; // Product description
  category: string; // Product category (e.g., men's clothing)
  image: string; // URL to the product image
  rating: {
    rate: number; // Average rating value
    count: number; // Number of ratings
  };
}

// Define the CartItem interface to represent an item in the cart (CartItem is about one item.)
// This is a composition approach, it keeps the Product separate from the cart logic.
// That violates the Single Responsibility Principle (SRP)
//extends Product flattens the object and says: “CartItem is literally just a Product + 1 field.”
// { product: Product } wraps the Product and says: “CartItem is a separate thing that has a product inside it.”
export interface CartItem {
  product: Product; // The product object
  quantity: number; // How many of this product are in the cart
}

// CartState is about the whole cart (which is a list of items).
// Define the cart module state interface
export interface CartState {
  items: CartItem[]; // Array of cart items with product and quantity
}

// Define the products module state interface
interface ProductsState {
  items: Product[]; // Array of all products from API
}
