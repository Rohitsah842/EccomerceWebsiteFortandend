import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { BiArrowBack } from 'react-icons/bi'
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './Payment';
import Review from './Review';
import './Checkout.css'

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step, checkoutFormData, setCheckoutFormData, setIsDisable) {
    switch (step) {
        case 0:
            return <AddressForm address={checkoutFormData} setAddress={setCheckoutFormData} setIsDisable={setIsDisable} />;
        case 1:
            return <PaymentForm paymentData={checkoutFormData} setPaymentData={setCheckoutFormData} setIsDisable={setIsDisable} />;
        case 2:
            return <Review checkoutData={checkoutFormData} />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout({ goToCartPage }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isDisable, setIsDisable] = React.useState(true);
    const [checkoutFormData, setCheckoutFormData] = React.useState({
        "fName": "",
        "lName": "",
        "address1": "",
        "address2": "",
        "city": "",
        "postalCode": "",
        "country": "",
        "mobileNo": "",
        paymentDetails: {
            "upi_id": "",
            "card": {
                "card_holder": "",
                "card_number": "",
                "expiry_date": "",
                "CVV": ""
            }
        }
    })


    const handleNext = () => {
        setActiveStep(prev => prev + 1);
        console.log(activeStep);
        if (activeStep === steps.length - 1) {
            alert("Your order succesfully ordered");
        }
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };
    const backClickHandler = () => {
        goToCartPage(false);
    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }} >

                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} style={{ boxShadow: "1px 2px 3px 3px gray" }}>
                    <BiArrowBack onClick={backClickHandler} style={{ fontSize: "2rem", cursor: "pointer" }} />
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                        )}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep, checkoutFormData, setCheckoutFormData, setIsDisable)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    disabled={isDisable}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </React.Fragment>
    );
}