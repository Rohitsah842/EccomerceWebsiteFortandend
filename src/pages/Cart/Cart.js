import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBRow,
    MDBTooltip,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState, useEffect, useContext } from "react";
import classes from './Cart.module.css'
import CartItem from "../../components/CartItem/CartItem";
import { getAuthToken, request } from "../../utils/axios_helper";
import { cart } from '../../contexts/CartContext'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import Checkout from "../../components/CheckoutOrder/Checkout";
import { setCartItemsToLocalStorage } from "../../utils/setCartItemsToLocalStorage";

function Cart() {
    const [totalAmount, setTotalAmount] = useState(0);
    const [shippngCharge, setShipingCharge] = useState(0)
    const [isCheckoutShow, setIsCheckoutShow] = useState(false);

    const { cartState } = useContext(cart);
    const navigate = useNavigate();

    useEffect(() => {
        let totalPrice = 0;
        cartState.cartItems.forEach((item) => {
            totalPrice += item.price * item.quantity;
        })
        setTotalAmount(totalPrice);
        if (totalPrice < 10000) {
            setShipingCharge(Math.round(totalPrice * 0.05));
        } else {
            setShipingCharge(0);
        }
    }, [cartState])


    const checkoutHandle = () => {
        console.log("checkout")
        setIsCheckoutShow(true);
    }



    const backClickHandler = () => {
        navigate("/");
    }
    const date = new Date();

    return (
        <>
            {isCheckoutShow ? <Checkout goToCartPage={setIsCheckoutShow} /> :
                <section className={`h-100 ${classes["gradient-custom"]}`}>
                    <MDBContainer className="py-5 h-100">
                        <MDBRow className="justify-content-center my-4">
                            <MDBCol md="8">
                                <MDBCard className="mb-4">

                                    <MDBCardHeader className={`py-3 ${classes["cart-header"]}`} >
                                        <BiArrowBack onClick={backClickHandler} style={{ fontSize: "2rem", cursor: "pointer" }} />
                                        <MDBTypography tag="h5" className="mb-0">
                                            {`Cart - ${cartState.cartItems.length} items`}
                                        </MDBTypography>
                                    </MDBCardHeader>
                                    <MDBCardBody>
                                        {cartState.cartItems.map((item) => {
                                            return <CartItem key={item.id} id={item.id} name={item.name} price={item.price} qty={item.quantity} />
                                        })}


                                    </MDBCardBody>
                                </MDBCard>

                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <p>
                                            <strong>Expected shipping delivery</strong>
                                        </p>
                                        <p className="mb-0">{`${date.getDate() + 2}.${date.getMonth() + 1}.${date.getFullYear()} - ${date.getDate() + 4}.${date.getMonth() + 1}.${date.getFullYear()}`}</p>
                                    </MDBCardBody>
                                </MDBCard>

                                <MDBCard className="mb-4 mb-lg-0">
                                    <MDBCardBody>
                                        <p>
                                            <strong>We accept</strong>
                                        </p>
                                        <MDBCardImage className="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                            alt="Visa" />
                                        <MDBCardImage className="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                            alt="American Express" />
                                        <MDBCardImage className="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                            alt="Mastercard" />
                                        <MDBCardImage className="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                            alt="PayPal acceptance mark" />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol md="4">
                                <MDBCard className="mb-4">
                                    <MDBCardHeader>
                                        <MDBTypography tag="h5" className="mb-0">
                                            Summary
                                        </MDBTypography>
                                    </MDBCardHeader>
                                    <MDBCardBody>
                                        <MDBListGroup flush>
                                            <div class="d-flex justify-content-between b-bottom"> <input type="text" class="input-medium" placeholder="COUPON CODE" />
                                                <div class="btn btn-primary">Apply</div>
                                            </div>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Order Summary {` (${cartState.cartItems.length} Items)`}
                                                <span>{`₹${totalAmount}`}</span>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                                Shipping
                                                <span>{shippngCharge}</span>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Total amount</strong>
                                                    <strong>
                                                        <p className="mb-0">(including VAT)</p>
                                                    </strong>
                                                </div>
                                                <span>
                                                    <strong>{`₹${totalAmount + shippngCharge}`}</strong>
                                                </span>
                                            </MDBListGroupItem>
                                        </MDBListGroup>

                                        <MDBBtn block size="lg" onClick={checkoutHandle}>
                                            Go to checkout
                                        </MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            }

        </>
    )
}

export default Cart
