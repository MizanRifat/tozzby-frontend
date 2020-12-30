import React from 'react'
import Main from './Stripe/Main'
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

export default function PaymentCard() {
    const history = useHistory();
    return (
        <div>
            <Main />
            <div className="text-right mt-3">
                <Button
                    variant='contained'
                    onClick={() => history.push('/checkout/order_summary')}
                    color='secondary'
                // disabled = {!isSuccess}
                >
                    Back
                            </Button>
            </div>
        </div>
    )
}
