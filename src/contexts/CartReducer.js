import React from 'react'
import { request } from '../utils/axios_helper'

const CartReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case "ADD_TO_CART":
            console.log('add to cart')
            if (state.isLogin) {
                try {
                    request("POST", `/Ecommerce/addToCart/${action.payload.id}/${action.payload.quantity}`)
                    return { ...state, cartItems: [...state.cartItems, action.payload] };
                } catch (error) {
                    console.log(error);
                }

            } else {
                let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
                let newCartItems;
                let isPresent = cartItems.some((item, i) => {
                    return item.id === action.payload.id ? true : false;
                })
                console.log(isPresent, action.payload);
                isPresent ? (newCartItems = cartItems.map((item) => {
                    if (item.id === action.payload.id) {
                        return ({ ...item, quantity: item.quantity + 1 });
                    }
                    return { ...item };
                })) : (newCartItems = [...cartItems, action.payload]);
                console.log(newCartItems);
                localStorage.setItem("cartItems", JSON.stringify(newCartItems))
                return { ...state, cartItems: [...newCartItems] };
            }
            break;
        case "INCREMENT_QTY":
            console.log(state.cartItems.map(prev => prev.id === action.payload.id ? { ...prev, quantity: prev.quantity + 1 } : { ...prev }));
            return { ...state, cartItems: [...state.cartItems.map(prev => prev.id === action.payload.id ? { ...prev, quantity: prev.quantity + 1 } : { ...prev })] };
        case "DECREMENT_QTY":
            return { ...state, cartItems: [...state.cartItems.map(prev => prev.id === action.payload.id ? { ...prev, quantity: prev.quantity - 1 } : { ...prev })] };
        case "REMOVE_FROM_CART":
            return { ...state, cartItems: state.cartItems.filter(prev => prev.id !== action.payload.id) };

        case "SEARCH_ITEM":
            return { ...state, searchText: action.payload.name }
        case "LOGIN":
            return { ...state, isLogin: action.payload.isLogin }
        case "addAllItems":
            return { ...state, cartItems: [...action.payload] }

        default:
            return state;
    }
}

export default CartReducer
