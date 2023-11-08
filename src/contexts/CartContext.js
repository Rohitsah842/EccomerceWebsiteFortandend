import { createContext, useContext, useReducer } from 'react'
import CartReducer from './CartReducer';
export const cart = createContext();

const CartContext = ({ children }) => {
    const [cartState, dispatch] = useReducer(CartReducer,
        {
            cartItems: [],
            isLogin: false,
            searchText: ""
        });
    console.log(cartState)
    return (
        <cart.Provider value={{ cartState, dispatch }}>{children}</cart.Provider>
    );
};
export default CartContext;

