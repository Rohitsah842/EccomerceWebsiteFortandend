import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { RxCross2 } from "react-icons/rx"
import { useNavigate } from "react-router-dom";
import Input from '../../components/Input/Input';
import { useInput } from '../../hooks/useInput';
import { PostRequest } from '../../utils/PostRequest';
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import classes from './SignUp.module.css'
import { request } from '../../utils/axios_helper';


function SignUp() {

    const signUpUrl = "http://localhost:8080/sign-up"
    const emailRegExp = /^([a-zA-Z0-9])+(\@)+(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const pwdRegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const mobRegExp = /^[0]?[6789]\d{9}$/;

    const [isShow, setIsShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const navigate = useNavigate();
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

    const {
        value: cnfmPwdValue,
        isValid: isValidCnfmPwd,
        hasError: cnfmPwdHasError,
        valueChangeHandler: cnfmPwdChangeHandler,
        blurHandler: cnfmPwdblurHandler,
        reset: resetCnfmPwd
    } = useInput((value) => pwdRegExp.test(value));



    const {
        value: fName,
        isValid: isValidFName,
        hasError: fNameHasError,
        valueChangeHandler: fNameChangeHandler,
        blurHandler: fNameblurHandler,
        reset: resetFName
    } = useInput((value) => value.trim() !== '');

    const {
        value: lName,
        isValid: isValidLName,
        hasError: lNameHasError,
        valueChangeHandler: lNameChangeHandler,
        blurHandler: lNameblurHandler,
        reset: resetLName
    } = useInput((value) => value.trim() !== '');

    const {
        value: mobileNo,
        isValid: isValidMobileNo,
        hasError: mobileNoHasError,
        valueChangeHandler: mobileNoChangeHandler,
        blurHandler: mobileNoblurHandler,
        reset: resetMobileNo
    } = useInput((value) => mobRegExp.test(value));




    const clickHandler = () => {
        console.log("Hello");
        navigate("/")
    }


    const submitHandler = async (event) => {
        event.preventDefault();
        const postData = {
            "fname": fName,
            "lname": lName,
            "email": emailValue,
            "password": pwdValue,
            "confirmPassword": cnfmPwdValue,
            "mobileNo": mobileNo
        };
        if (!isValidFName && !isValidLName && !isValidMobileNo &&
            !isValidEmail && !isValidPwd && !isValidCnfmPwd) {
            return;
        }
        // PostRequest(signUpUrl, postData, navigate, setErrorMessage);
        try {
            await request("POST", "/sing-up", postData);
            navigate("/");
            resetFName();
            resetLName();
            resetMobileNo();
            resetEmail();
            resetpwd();
            resetCnfmPwd();
        } catch (error) {
            setErrorMessage(error)
        }

    }

    const toggleHandler = () => {
        setIsShow(!isShow);
    }

    return (
        <>
            <CssBaseline />
            {/* <div> */}
            <div className={classes.sign_up}>

                <Box className={classes.box} sx={{ bgcolor: 'white', boxShadow: '-1px 1px 8px 4px #392235', height: 'max-content', padding: '2rem' }}>
                    <span class={classes.crossIcon}><RxCross2 onClick={clickHandler} /></span>
                    {errorMessage && Object.entries(errorMessage).map(([key, value]) => <p style={{ color: "red" }}>{value}</p>)}
                    <h2>Sign up</h2>
                    <form onSubmit={submitHandler} method='post'>
                        <Input
                            id="firstName"
                            type="text"
                            value={fName}
                            placeholder="Enter the first Name..."
                            title="First Name"
                            warningMessage={fNameHasError && "This field cann't be blank"}
                            onChange={fNameChangeHandler}
                            onBlur={fNameblurHandler}
                            hasError={fNameHasError} />
                        <Input
                            id="lastName"
                            type="text"
                            value={lName}
                            placeholder="Enter the last name"
                            title="Last Name"
                            warningMessage={lNameHasError && "This field cann't be blank"}
                            onChange={lNameChangeHandler}
                            onBlur={lNameblurHandler}
                            hasError={lNameHasError} />
                        <Input
                            id="email"
                            type="text"
                            value={emailValue}
                            placeholder="Enter the email..."
                            title="Email"
                            warningMessage={emailHasError && "This field cann't be blank"}
                            onChange={emailChangeHandler}
                            onBlur={emailblurHandler}
                            hasError={emailHasError} />
                        <Input
                            id="mobileNo"
                            type="text"
                            value={mobileNo}
                            placeholder="Enter the mobile number"
                            title="Mobile Number"
                            warningMessage={mobileNoHasError && "This field cann't be blank"}
                            onChange={mobileNoChangeHandler}
                            onBlur={mobileNoblurHandler}
                            hasError={mobileNoHasError} />

                        <div className={classes['form-password']}>
                            <Input
                                id="password"
                                type={`${isShow ? 'text' : 'password'}`}
                                value={pwdValue}
                                placeholder="Enter the password..."
                                title="Password"
                                warningMessage={pwdHasError && "This field cann't be blank"}
                                onChange={pwdChangeHandler}
                                onBlur={pwdblurHandler}
                                hasError={pwdHasError} />
                            <span className={classes.spanBtn}>
                                <button type="button" class="btn btn-link btn-lg" onClick={toggleHandler}>
                                    {isShow ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                            </span>
                        </div>
                        <small class="form-text text-muted">Enter the password min 6 digit including special charector (example:-abcd@123) </small>
                        <Input
                            id="confirmPassword"
                            type='password'
                            value={cnfmPwdValue}
                            placeholder="Enter the password..."
                            title="Confirm Password"
                            warningMessage={(cnfmPwdHasError || (pwdValue !== cnfmPwdValue)) && "Password didn't matched"}
                            onChange={cnfmPwdChangeHandler}
                            onBlur={cnfmPwdblurHandler}
                            hasError={(cnfmPwdHasError || (pwdValue !== cnfmPwdValue))} />
                        <button type="submit" className="btn btn-primary"
                            disabled={!isValidFName || !isValidLName || !isValidEmail || !isValidMobileNo || !isValidPwd || !isValidCnfmPwd}>
                            Sign up</button>
                    </form>
                    If you already sign up <Link to='/sign-in' >Sign in</Link>
                </Box >
            </div>
            {/* </div> */}
        </>
    )
}

export default SignUp;
