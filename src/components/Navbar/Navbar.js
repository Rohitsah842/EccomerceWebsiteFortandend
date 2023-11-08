import React, { useContext, useEffect, useState, useRef } from 'react'
import { useOnKeyPress } from '../../hooks/useOnKeyPress';
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink, Bars, Img, Input, NavInput, SearchIcon } from './NavbarElement';
import Sidebar from '../Sidebar/Sidebar.js';
import { PiShoppingCartSimpleThin } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi'
import './Navbar.css';
import { cartCountContext } from '../../App';
import { cart } from '../../contexts/CartContext'



const url = "data:image/jpeg;base64,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"


function Navbar() {
    const { cartState, dispatch } = useContext(cart);

    const [showSidebar, setShowSidebar] = useState(false);
    const [profileClass, setProfileClass] = useState("profile-link");
    const inputValue = useRef();



    const submitHandler = () => {
        dispatch({ type: "SEARCH_ITEM", payload: { name: inputValue.current.value } });
        inputValue.current.value = "";
    }

    useOnKeyPress(submitHandler, "Enter");

    const sidebarHandler = () => {
        setShowSidebar(!showSidebar);
        console.log(showSidebar);
    }

    const clickHandler = () => {
        if (profileClass === "profile-link") {
            setProfileClass("profile-active");
        } else {
            setProfileClass("profile-link");
        }
    }

    return (
        <>
            <Nav>
                <NavLink to="/">
                    <Img src={require("../../assets/images/logo.png")} alt="logo" />
                </NavLink>

                <NavInput>
                    <Input type='text' ref={inputValue} placeholder='Search for products' />
                    <button onClick={submitHandler} style={{ backgroundColor: "white", borderRadius: "50%" }} ><SearchIcon /></button>
                </NavInput>
                <Bars onClick={sidebarHandler} />
                <NavMenu>

                    <NavLink to="/service" activeStyle >
                        SignUp for Supplier</NavLink>
                    <NavLink to="/cart" activeStyle >
                        <PiShoppingCartSimpleThin className='cart' />{cartState.cartItems.length > 0 && <span className='cart-value'>{cartState.cartItems.length} </span>}</NavLink>

                    <NavBtn>
                        {(!cartState.isLogin) ? <NavBtnLink to="/sign-in">SignIn</NavBtnLink>
                            : <BiUserCircle className='profile-icon' onClick={clickHandler} />
                        }
                    </NavBtn>
                </NavMenu>
                <div className={profileClass}>
                    <h3>Hello {localStorage.getItem("customerName")}</h3>
                    <NavLink to="/your-order" onClick={clickHandler}>Your Order</NavLink>
                    <NavLink to="/Account-details" onClick={clickHandler}>Your Account</NavLink>
                    <NavLink to="/sign-out" onClick={clickHandler}>SignOut</NavLink>
                </div>
                {
                    showSidebar && <Sidebar method={sidebarHandler} />
                }

            </Nav>
        </>
    )
}

export default Navbar
