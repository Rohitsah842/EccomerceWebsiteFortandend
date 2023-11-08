import { useContext } from "react"
import { cart } from "../contexts/CartContext"
import { useNavigate } from "react-router-dom";

export const SignOut = () => {
    const { dispatch } = useContext(cart);
    const navigate = useNavigate();
    localStorage.clear("token");
    dispatch({ type: "LOGIN", payload: { isLogin: false } });
    navigate("/");
    return;
}