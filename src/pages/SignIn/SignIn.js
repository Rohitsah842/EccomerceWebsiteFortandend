import React, { useContext, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { RxCross2 } from "react-icons/rx"
import { useNavigate } from "react-router-dom";
import './SignIn.css'
import Input from '../../components/Input/Input';
import { useInput } from '../../hooks/useInput';
import { PostRequest } from '../../utils/PostRequest';
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { cart } from '../../contexts/CartContext';
import { request, setAuthToken } from '../../utils/axios_helper';
import { loadCartItems } from '../../utils/loadCartItems';


function SignIn() {

    const emailRegExp = /^([a-zA-Z0-9])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const pwdRegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const loginUrl = "http://localhost:8080/sign-in";
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { dispatch } = useContext(cart);
    const {
        value: emailValue,
        isValid: isValidEmail,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        blurHandler: emailblurHandler,
        reset: resetEmail
    } = useInput((value) => emailRegExp.test(value));

    const {
        value: pwdValue,
        isValid: isValidPwd,
        hasError: pwdHasError,
        valueChangeHandler: pwdChangeHandler,
        blurHandler: pwdblurHandler,
        reset: resetpwd
    } = useInput((value) => pwdRegExp.test(value));

    const clickHandler = () => {
        navigate("/")
    }
    const data = { email: emailValue, password: pwdValue };
    const submitHandler = async (event) => {
        event.preventDefault();
        if (!isValidEmail && !isValidPwd) {
            return;
        }

        try {
            let response = await request("POST", "/sign-in", data);

            setAuthToken(response.data.Token);
            // let cartItemsRes= await request("GET","cartItems");
            localStorage.setItem("customerName", response.data.name);
            let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
            if (cartItems.length !== 0) {
                cartItems.forEach(async (e) => {
                    await request("POST", `/Ecommerce/addToCart/${e.id}/${e.quantity}`);
                });
            }
            dispatch({ type: "LOGIN", payload: { isLogin: true } });
            loadCartItems();
            resetEmail();
            resetpwd();
            navigate("/");
        } catch (error) {
            console.error(error);
            setError(error);
        }

    }

    const toggleHandler = () => {
        setIsShow(!isShow);
    }

    return (
        <>
            <CssBaseline />
            <div class="sign">

                <Box className="box" sx={{ bgcolor: 'white', boxShadow: '-1px 1px 8px 4px #392235', height: 'max-content', padding: '2rem' }}>
                    <span class="crossIcon"><RxCross2 onClick={clickHandler} /></span>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <h2>Sign In</h2>
                    <form onSubmit={submitHandler} method='post'>
                        <Input
                            id="email"
                            type="text"
                            value={emailValue}
                            placeholder="Enter the email..."
                            title="Email"
                            warningMessage={!isValidEmail && "please enter a valid email"}
                            onChange={emailChangeHandler}
                            onBlur={emailblurHandler}
                            hasError={emailHasError} />
                        <div className='form-password'>
                            <Input
                                id="password"
                                type={`${isShow ? 'text' : 'password'}`}
                                value={pwdValue}
                                placeholder="Enter the password..."
                                title="Password"
                                warningMessage={!isValidPwd && "please enter a valid password"}
                                onChange={pwdChangeHandler}
                                onBlur={pwdblurHandler}
                                hasError={pwdHasError} />
                            <span className='spanBtn'>
                                <button type="button" class="btn btn-link btn-lg" onClick={toggleHandler}>
                                    {isShow ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                            </span>
                        </div>
                        <Link className='forgetPwdLink' to='/forget-password'>Forget Password?</Link>
                        <button type="submit" class="btn btn-primary" disabled={!isValidEmail || !isValidPwd}>Sign in</button>
                    </form>
                    <div style={{ textAlign: 'center' }}>-----------------------OR-------------------------</div>
                    <button class="btn btn-primary" ><Link to='/sign-up' style={{ color: 'white', textDecoration: 'none' }}>Sign up</Link></button>
                </Box >
            </div>
        </>
    )
}

export default SignIn
