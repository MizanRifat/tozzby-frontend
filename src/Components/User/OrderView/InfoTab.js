import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Button } from '@material-ui/core';
import ProductsTable from './ProductsTable';
import { OrderContext } from './OrderView';
import OrderDetails from './OrderDetails';
import AmountTable from './AmountTable';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabRoot: {
        fontWeight: 700,
        fontSize: '16px',
    },
}));


export default function InfoTab({ order }) {
    const classes = useStyles();
    // const { order } = useContext(OrderContext);


    return (
        <div>
            <div className="d-flex justify-content-between">
                <p className="mt-2"><span style={{ fontWeight: 700, marginRight: '20px' }}>Placed On</span> <span>20 May 2020</span></p>

                {/* {
                    order.status == 'pending' ?

                        <Button variant='contained' color='secondary' size='small' style={{ height: '35px' }}>Cancel Order</Button>

                        : */}

                <Chip
                    label={order.status_label}
                    color='primary'
                    className={order.status_label != '' && order.status_label}
                    style={order.status == 'completed' ? { background: '#43A047' } : { background: '#FFC107' }}
                />
                {/* } */}

            </div>
            <hr />
            <h5>Products Ordered</h5>
            <ProductsTable items={order.items} usedFor='orderview' />

            <div >
                <div className="d-flex justify-content-end" style={{ fontSize: '14px' }}>
                    <div className="">
                        <AmountTable usedFor='infoTab' order={order} />
                    </div>
                </div>
            </div>

            <hr />

            <OrderDetails order={order} />


        </div>
    )
}
