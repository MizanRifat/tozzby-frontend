import React, { useState, useContext } from 'react'
import { Button, } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios'
import { AppContext } from '../../Routes';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    buttonProgress: {
        position: 'absolute',
        right: '23px',
        top: '6px',
    }


}))


export default function PaymentMethod() {
    const history = useHistory();
    const classes = useStyles();


    const [value, setValue] = React.useState('cashondelivery');
    const { user, cartItems, setCartItems, setAuthOpen } = useContext(AppContext);
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        if (cartItems.payment != null) {
            setValue(cartItems.payment.method)
        }
    }, [cartItems])


    const handleSubmit = () => {
        setLoading(true)
        if (cartItems.payment != null) {
            if (value == cartItems.payment.method) {
                
                    history.push('/checkout/order_summary')


            }
        }
        axios.post(`${process.env.REACT_APP_DOMAIN}/api/checkout/save-payment?token=true`,
            {
                "payment": {
                    method: value
                }
            },
            {
                withCredentials: true
            }
        ).then(response => {
            // console.log(response)
            setCartItems(response.data.data.cart)
            
                history.push('/checkout/order_summary')
        
            setLoading(false)
        })
            .catch(error => {
                setLoading(false)
            })

    }

    return (
        <>
            <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="cashondelivery" control={<Radio />} label="Cash On Delivery" />
                    <FormControlLabel value="moneytransfer" control={<Radio />} label="Money Transfer" />
                    <FormControlLabel value="paypal_standard" control={<Radio />} label="Paypal Standard" />
                    <FormControlLabel value="stripepayment" control={<Radio />} label="Card Payment" />
                </RadioGroup>
            </FormControl>
            <div className="text-right mt-3" style={{ position: 'relative' }}>
                <Button
                    variant='contained'
                    onClick={() => history.push('/checkout/billing_information')}
                    color='secondary'
                    style={{ marginRight: '6px' }}
                // disabled = {!isSuccess}
                >
                    Back
                    </Button>
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                    color='primary'
                    disabled={loading}
                >
                    Next
                    </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </>
    );
}
