import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

// const products =localStorage.getItem(JSON.parse("cartItems"))

// const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];


export default function Review({ checkoutData }) {
    const [payments, setPayments] = React.useState([]);
    var amount = 0;
    const products = JSON.parse(localStorage.getItem("cartItems"));
    console.log(products);

    const addresses = [checkoutData.address1, checkoutData.address2,
    checkoutData.city, checkoutData.country, checkoutData.postalCode,
    `Mobile No: ${checkoutData.mobileNo}`];

    products.forEach(element => {
        amount += element.price * element.quantity;
    });

    React.useEffect(() => {
        if (checkoutData.paymentDetails.upi_id === "") {
            setPayments([
                { name: 'Card type', detail: 'Visa' },
                { name: 'Card holder', detail: checkoutData.paymentDetails.card.card_holder },
                { name: 'Card number', detail: checkoutData.paymentDetails.card.card_number },
                { name: 'Expiry date', detail: checkoutData.paymentDetails.card.expiry_date },
            ])
        } else {
            setPayments([{ name: "Upi id", detail: checkoutData.paymentDetails.upi_id }])
        }
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {products.map((product) =>
                (

                    <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                        <Typography variant="body2">{product.quantity * product.price}</Typography>
                    </ListItem>
                )


                )}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total Amount" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {amount}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping Address
                    </Typography>
                    <Typography gutterBottom>{`${checkoutData.fName} ${checkoutData.lName}`}</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}