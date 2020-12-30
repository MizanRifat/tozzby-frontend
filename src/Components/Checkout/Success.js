import React, { useContext,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Divider, Button, } from '@material-ui/core';
import { OrderContext } from './Checkout';
import NotiToast from '../Common/NotiToast';


export default function Success() {

    const history = useHistory();
    const { order, setOrder } = useContext(OrderContext);
    const toast = NotiToast();

    const handleClick = (e) => {
        setOrder({})
        history.push('/')
    }

    useEffect(() => {
        if(Object.entries(order).length == 0){
            history.push('/')
        }else{
            toast('Order Successfully Placed.', 'success')
        }
        
    }, [])

    return (
        <div className="mt-2">
            <h5>Thank you for your order!</h5>
            <p>Your order id is #{order.id}</p>
            <p>We will email you, your order details and tracking information.</p>
            <Button
                variant='contained'
                onClick={handleClick}
                color='primary'
                style={{ borderRadius: 0, }}
            >
                Continue Shopping
                    </Button>
        </div>
    )
}
