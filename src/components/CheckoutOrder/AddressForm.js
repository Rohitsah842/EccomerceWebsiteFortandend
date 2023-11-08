import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddressForm({ address, setAddress, setIsDisable }) {

  const [isVisited, setIsVisited] = React.useState({
    "fName": false,
    "lName": false,
    "address1": false,
    "address2": false,
    "city": false,
    "postalCode": false,
    "country": false,
    "mobileNo": false
  })
  const [isValidation, setIsValidation] = React.useState({
    "fName": true,
    "lName": true,
    "address1": true,
    "address2": true,
    "city": true,
    "postalCode": true,
    "country": true,
    "mobileNo": true
  })

  React.useEffect(() => {
    checkValidation(address);
  }, [address])

  const changeHandler = (e) => {
    setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.value.trim() !== '') {
      setIsValidation({ ...isValidation, [e.target.name]: false });
    } else {
      setIsValidation({ ...isValidation, [e.target.name]: true });
    }
  }
  const blurHandler = (e) => {
    setIsVisited({ ...isVisited, [e.target.name]: true });
  }
  const checkValidation = (value) => {
    if (value.fName !== '' && value.lName !== '' && value.address1 !== '' && value.city
      !== '' && value.country !== '' && value.postalCode !== '' && value.mobileNo) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={(isValidation.fName && isVisited.fName) && true}
            helperText={(isValidation.fName && isVisited.fName) && "This field cann't be blank."}
            required
            id="firstName"
            name="fName"
            value={address.fName}
            label="First name"
            fullWidth
            autoComplete="given-name"
            onChange={changeHandler}
            onBlur={blurHandler}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lName"
            value={address.lName}
            label="Last name"
            fullWidth
            autoComplete="family-name"
            onChange={changeHandler}
            onBlur={blurHandler}
            variant="standard"
            error={(isValidation.lName && isVisited.lName) && true}
            helperText={(isValidation.lName && isVisited.lName) && "This field cann't be blank."}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            value={address.address1}
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={changeHandler}
            onBlur={blurHandler}
            variant="standard"
            error={(isValidation.address1 && isVisited.address1) && true}
            helperText={(isValidation.address1 && isVisited.address1) && "This field cann't be blank."}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            value={address.address2}
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            onChange={changeHandler}
            onBlur={blurHandler}
            variant="standard"

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            value={address.city}
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={changeHandler}
            onBlur={blurHandler}
            variant="standard"
            error={(isValidation.city && isVisited.city) && true}
            helperText={(isValidation.city && isVisited.city) && "This field cann't be blank."}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mobileNo"
            name="mobileNo"
            value={address.mobileNo}
            label="Mobile Number"
            onChange={changeHandler}
            onBlur={blurHandler}
            fullWidth
            variant="standard"
            error={(isValidation.mobileNo && isVisited.mobileNo) && true}
            helperText={(isValidation.mobileNo && isVisited.mobileNo) && "This field cann't be blank."}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="postalCode"
            label="Zip / Postal code"
            value={address.postalCode}
            onChange={changeHandler}
            onBlur={blurHandler}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            error={(isValidation.postalCode && isVisited.postalCode) && true}
            helperText={(isValidation.postalCode && isVisited.postalCode) && "This field cann't be blank."}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            value={address.country}
            label="Country"
            fullWidth
            autoComplete="shipping country"
            onChange={changeHandler}
            onBlur={blurHandler}
            variant="standard"
            error={(isValidation.country && isVisited.country) && true}
            helperText={(isValidation.country && isVisited.country) && "This field cann't be blank."}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"

          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}