import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Payment({ paymentData, setPaymentData, setIsDisable }) {
    // const [payMethod, setpayMethod] = React.useState('');
    const [upiId, setUpiId] = React.useState(paymentData.paymentDetails.upi_id);
    const { card_holder, card_number, expiry_date, CVV } = paymentData.paymentDetails.card
    const [isCorrectUpi, setIsCorrectUpi] = React.useState((paymentData.paymentDetails.upi_id) !== "");
    const [isVisited, setIsVisited] = React.useState({
        "card_holder": false,
        "card_number": false,
        "expiry_date": false,
        "CVV": false
    })
    const [isValidation, setIsValidation] = React.useState({
        "card_holder": true,
        "card_number": true,
        "expiry_date": true,
        "CVV": true
    })
    const match = /[0-9_]{5,}@[a-zA-Z]{3,}/;

    let paymentMethod = "";
    (paymentData.paymentDetails.upi_id) !== "" ? paymentMethod = "UPI" : (paymentData.paymentDetails.card.card_number !== "") ? paymentMethod = "Card" : paymentMethod = ""
    const [payMethod, setpayMethod] = React.useState(paymentMethod);

    React.useEffect(() => {
        if (paymentData.paymentDetails.upi_id !== "" || (paymentData.paymentDetails.card.card_holder != "" &&
            paymentData.paymentDetails.card.card_number != "" && paymentData.paymentDetails.card.expiry_date != ""
            && paymentData.paymentDetails.card.CVV != "")) {
            setIsDisable(false);
        }
        else {
            setIsDisable(true);
        }

    }, [paymentData])


    const handleChange = (event) => {
        setpayMethod(event.target.value);
        if (event.target.value === "UPI") {

            Object.keys(paymentData.paymentDetails.card).forEach((key) => {
                setPaymentData(prev => ({
                    ...prev,
                    paymentDetails: {
                        ...prev.paymentDetails, card:
                            { ...prev.paymentDetails.card, [key]: '' }
                    }
                }))
            })

            console.log(paymentData);

        } else {
            setUpiId("");
            setPaymentData(prev => ({
                ...prev, paymentDetails:
                    { ...prev.paymentDetails, upi_id: "" }
            }));
            setIsCorrectUpi(false);
        }
    };
    const inputChangeHandler = (e) => {
        let { name, value } = e.target;
        setPaymentData(prev => ({
            ...prev,
            paymentDetails: {
                ...prev.paymentDetails, card:
                    { ...prev.paymentDetails.card, [name]: value }
            }
        }))
        if (value.trim() !== '') {
            setIsValidation({ ...isValidation, [name]: false });
        } else {
            setIsValidation({ ...isValidation, [name]: true });
        }
    }
    const blurHandler = (e) => {
        setIsVisited({ ...isVisited, [e.target.name]: true });
    }

    const verifyHandler = () => {

        if (match.test(upiId)) {
            setIsCorrectUpi(true);
            setPaymentData({
                ...paymentData, paymentDetails:
                    { ...paymentData.paymentDetails, upi_id: upiId }
            })
        } else {
            setIsCorrectUpi(false);
        }
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={payMethod}
                onChange={handleChange}
            >
                <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
                {payMethod === "UPI" &&
                    <div>
                        <div class="input-group mb-3">
                            <input type="text" value={upiId} class="form-control" placeholder="Enter UPI Id Example:123456789@upi"
                                aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setUpiId(e.target.value)} />
                            <button class="btn btn-outline-primary" type="button" id="button-addon2" onClick={verifyHandler}>Verify</button>
                        </div>
                        {isCorrectUpi && <h5 style={{ color: "#0ae008" }}>Verify successfully</h5>}
                        {/* {(!isCorrectUpi && upiId !== "") && <h5 style={{ color: "red" }}>UPI id Invalid</h5>} */}
                    </div>
                }
                <FormControlLabel value="Card" control={<Radio />} label="Debits/Credits Card" />
            </RadioGroup>

            {payMethod === "Card" &&
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={(isValidation['card holder'] && isVisited['card holder']) && true}
                            helperText={(isValidation['card holder'] && isVisited['card holder']) && "This field cann't be blank."}
                            required
                            id="cardName"
                            name="card_holder"
                            value={card_holder}
                            label="Name on card"
                            fullWidth
                            autoComplete="cc-name"
                            variant="standard"
                            onChange={inputChangeHandler}
                            onBlur={blurHandler}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={(isValidation['card number'] && isVisited['card number']) && true}
                            helperText={(isValidation['card number'] && isVisited['card number']) && "This field cann't be blank."}
                            required
                            id="cardNumber"
                            label="Card number"
                            name="card_number"
                            value={card_number}
                            fullWidth
                            autoComplete="cc-number"
                            variant="standard"
                            onChange={inputChangeHandler}
                            onBlur={blurHandler}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={(isValidation['expiry date'] && isVisited['expiry date']) && true}
                            helperText={(isValidation['expiry date'] && isVisited['expiry date']) && "This field cann't be blank."}
                            required
                            id="expDate"
                            label="Expiry date"
                            name="expiry_date"
                            value={expiry_date}
                            fullWidth
                            autoComplete="cc-exp"
                            variant="standard"
                            onChange={inputChangeHandler}
                            onBlur={blurHandler}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={(isValidation.CVV && isVisited.CVV) && true}
                            helperText={(isValidation.CVV && isVisited.CVV) && "This field cann't be blank."}
                            required
                            id="cvv"
                            label="CVV"
                            name="CVV"
                            value={CVV}
                            fullWidth
                            autoComplete="cc-csc"
                            variant="standard"
                            onChange={inputChangeHandler}
                            onBlur={blurHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                            label="Remember credit card details for next time"
                        />
                    </Grid>
                </Grid>
            }
        </React.Fragment>
    );
}