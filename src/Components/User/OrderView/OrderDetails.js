import React from 'react'
import { Hidden } from '@material-ui/core'

export default function OrderDetails({order}) {
    return (
        <div className="d-flex justify-content-between">

            <div className="">
                <h5 style={{ fontWeight: 700 }}>Billing Address</h5>
                <div className="mb-1">{order.billing_address.first_name} {order.billing_address.last_name}</div>
                <div className="">{order.billing_address.address1[0]}</div>
                <div className="">{order.billing_address.city}</div>
                <div className="">{order.billing_address.state} - {order.billing_address.postcode}</div>
                <div className="">{order.billing_address.country_name}</div>
                <p className='mt-2'>Contact: {order.billing_address.phone}</p>
            </div>
            <div className="">
                <h5 style={{ fontWeight: 700 }}>Shipping Address</h5>
                <div className="mb-1">{order.shipping_address.first_name} {order.shipping_address.last_name}</div>
                <div className="">{order.shipping_address.address1[0]}</div>
                <div className="">{order.shipping_address.city}</div>
                <div className="">{order.shipping_address.state} - {order.shipping_address.postcode}</div>
                <div className="">{order.shipping_address.country_name}</div>
                <p className='mt-2'>Contact: {order.shipping_address.phone}</p>
            </div>
            <Hidden xsDown>
                <div className="">
                    <h5 style={{ fontWeight: 700 }}>Payment Method</h5>
                    <p>{order.payment_title}</p>
                </div>
                <div className="">

                </div>
            </Hidden>


        </div>
    )
}
