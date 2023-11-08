import { React, useState } from 'react'
import classes from './ForgetPasswor.module.css'
import Box from '@mui/material/Box';
import { RxCross2 } from "react-icons/rx"
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import Input from '../../components/Input/Input';
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { PutRequest } from '../../utils/PutRequest'

function ForgetPassword() {
    const emailRegExp = /^([a-zA-Z0-9])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const pwdRegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const forgetPwdUrl = "http://localhost:8080/forget-password";

    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");
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

    const clickHandler = () => {
        navigate("/sign-in")
    }
    const toggleHandler = () => {
        setIsShow(!isShow);
    }
    const postData = {
        "email": emailValue,
        "password": pwdValue,
        "confirmPassword": cnfmPwdValue
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(postData);
        if (!isValidEmail && !isValidPwd && !isValidCnfmPwd) {
            return;
        }

        PutRequest(forgetPwdUrl, postData, setError, navigate);
        // resetEmail();
        // resetpwd();
        // resetCnfmPwd();

    }



    return (
        <>
            <div class={classes.forget_Password}>

                <Box class={classes.box}>
                    <span class="crossIcon"><RxCross2 onClick={clickHandler} /></span>
                    <div class="card-header">
                        <h2 class="mb-3">Change Password</h2>
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form class="form" onSubmit={submitHandler} method='Post'>
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
                            disabled={!isValidEmail || !isValidPwd || !isValidCnfmPwd}>
                            Confirm</button>
                    </form>
                </Box>
            </div >
        </>

    )
};

export default ForgetPassword
