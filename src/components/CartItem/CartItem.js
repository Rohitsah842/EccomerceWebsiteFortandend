import React, { useState, useEffect, useContext } from 'react'
import { MDBBtn, MDBRow, MDBCol, MDBRipple, MDBTooltip } from 'mdb-react-ui-kit'
import classes from '../../pages/Cart/Cart.module.css'
import { AiOutlineMinus, AiOutlinePlus, AiFillHeart } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { request, getAuthToken } from '../../utils/axios_helper'
import { cart } from "../../contexts/CartContext"

function CartItem(props) {
    const { cartState, dispatch } = useContext(cart);
    const [itemCount, setItemCount] = useState(props.qty);



    const decreaseHandler = async () => {
        if (itemCount > 1) {
            if (getAuthToken() !== null) {
                try {
                    await request("POST", `/Ecommerce/updateCartItem/${props.id}/${itemCount}`);
                    dispatch({ type: "DECREMENT_QTY", payload: { id: props.id } });
                    setItemCount(prev => prev - 1);
                } catch (error) {
                    console.log(error);
                }
            } else {
                let cartItems = JSON.parse(localStorage.getItem("cartItems"));
                let updatedCartItems = cartItems.map((item) => {
                    return (item.id === props.id ? { ...item, quantity: item.quantity - 1 } : item);
                })
                localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
                dispatch({ type: "DECREMENT_QTY", payload: { id: props.id } });
            }
        }
    }
    const addHandler = async () => {
        if (itemCount < 5) {
            if (getAuthToken() !== null) {
                try {
                    await request("POST", `/Ecommerce/updateCartItem/${props.id}/${itemCount}`);
                    dispatch({ type: "INCREMENT_QTY", payload: { id: props.id } });
                    setItemCount(prev => prev + 1);
                } catch (error) {
                    console.log(error);
                }
            } else {
                let cartItems = JSON.parse(localStorage.getItem("cartItems"));
                let updatedCartItems = cartItems.map((item) => {
                    return (item.id === props.id ? { ...item, quantity: item.quantity + 1 } : item);
                })
                localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
                dispatch({ type: "INCREMENT_QTY", payload: { id: props.id } });
            }

        }
    }
    const deleteHandler = async (id) => {
        let cartItems = JSON.parse(localStorage.getItem("cartItems"));
        if (getAuthToken() !== null) {
            try {
                await request("DELETE", `/Ecommerce/deleteCartItem/${id}`);
                dispatch({ type: "REMOVE_FROM_CART", payload: { id: props.id } });
            } catch (error) {
                console.log(error);
            }
        } else {
            let filterCartItems = cartItems.filter((item) => {
                return item.id !== id;
            })
            localStorage.setItem("cartItems", JSON.stringify(filterCartItems))
            dispatch({ type: "REMOVE_FROM_CART", payload: { id: props.id } });
        }
    }
    const wishHandler = () => {
        console.log("move to wish list item");
    }
    return (
        <>
            <MDBRow>
                <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                    <MDBRipple rippleTag="div" rippleColor="light"
                        className="bg-image rounded hover-zoom hover-overlay">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                            className="w-100" />
                        <a href="#!">
                            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                            </div>
                        </a>
                    </MDBRipple>
                </MDBCol>

                <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                    <p>
                        <strong>{props.name}</strong>
                    </p>
                    <p>Color: blue</p>
                    <p>Size: M</p>

                    <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass={classes['delete-button']}
                        title="Remove item" style={{ backgroundColor: "red!important" }} >
                        <MdDelete onClick={() => deleteHandler(props.id)} />
                    </MDBTooltip>

                    <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass={classes['wishList-button']}
                        title="Move to the wish list" >
                        <AiFillHeart onClick={wishHandler} />
                    </MDBTooltip>
                </MDBCol>
                <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                    <div className="d-flex mb-4" style={{ maxWidth: "300px", justifyContent: "center" }}>
                        <MDBBtn className={classes['text-dark']} color='secondary' onClick={() => decreaseHandler(props.id)}>
                            <AiOutlineMinus />
                        </MDBBtn>
                        <span className={classes['item-count']}>{itemCount}</span>

                        <MDBBtn className={classes['text-dark']} color='secondary' onClick={() => addHandler(props.id)}>
                            <AiOutlinePlus />
                        </MDBBtn>
                    </div>

                    <p className="text-start text-md-center" style={{ fontSize: "1.4rem" }} >Total Amount<br />
                        <strong>{`₹${props.price} X ${itemCount} = ₹${itemCount * props.price}`}</strong>
                    </p>
                </MDBCol>
            </MDBRow>
            <hr className="my-4" />
        </>
    )
}

export default CartItem;
