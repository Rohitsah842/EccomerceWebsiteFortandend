import { useContext } from "react";
import { request, getAuthToken } from "./axios_helper";
import { cart } from "../contexts/CartContext";

export const loadCartItems = async () => {
    const { dispatch } = useContext(cart)
    if (getAuthToken() != null) {
        dispatch({ type: "LOGIN", payload: { isLogin: true } });
        try {
            const respData = await request("GET", "/Ecommerce/cartItems");
            const cartItems = respData.data.body.map(item => {
                return (
                    {
                        "id": item.product.id,
                        "name": item.product.name,
                        "price": item.product.price,
                        "imgUrl": item.product.productImage.fileName,
                        "quantity": item.quantity
                    }
                )

            });
            dispatch({ type: "addAllItems", payload: cartItems });
        } catch (error) {
            console.log(error);
        }
    } else {
        let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        dispatch({ type: "addAllItems", payload: cartItems });
    }
}