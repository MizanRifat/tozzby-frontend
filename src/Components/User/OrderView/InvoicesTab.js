import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
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


export default function InfoTab({order}) {
    const classes = useStyles();
    // const { order } = useContext(OrderContext);


    return (
        <div>
            {
                order.invoices.length == 0 ?
                    <div className="text-center">
                        'No invoices'
                </div>

                    :

                    <>
                        <p style={{ fontWeight: 700, fontSize: '16px' }}>Invoices #{order.invoices[0].id}</p>
                        <ProductsTable items={order.items} usedFor='invoices' />

                        <div >
                            <div className="d-flex justify-content-end" style={{ fontSize: '14px' }}>
                                <div className="mt-2">
                                    <AmountTable usedFor='invoices' order={order} />
                                </div>
                            </div>
                        </div>

                        <hr />

                        <OrderDetails order={order} />
                    </>
            }

        </div>
    )
}
