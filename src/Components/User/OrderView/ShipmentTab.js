import React from 'react'
import ProductsTable from './ProductsTable'
import OrderDetails from './OrderDetails'

export default function ShipmentTab({ order }) {
    return (
        <div>
            <p style={{ fontWeight: 700, fontSize: '16px' }}>Shipment #{order.shipments[0].id}</p>
            <div className="mt-3">
                <table width='200px'>
                    <tr>
                        <th style={{ width: '100px' }}></th>
                        <th style={{ width: '100px' }}></th>
                    </tr>
                    <tr>
                        <td><p style={{ fontWeight: 700, fontSize: '16px' }}>Carrier :</p></td>
                        <td><p style={{ fontWeight: 700, fontSize: '16px' }}>{order.shipments[0].carrier_title}</p></td>
                    </tr>
                    <tr>
                        <td><p style={{ fontWeight: 700, fontSize: '16px' }}>Track No. :</p></td>
                        <td><p style={{ fontWeight: 700, fontSize: '16px' }}>{order.shipments[0].track_number}</p></td>
                    </tr>
                </table>
            </div>
            <ProductsTable items={order.items} usedFor='invoices' />
            <div className="mt-5">
                <OrderDetails order={order} />
            </div>
        </div>
    )
}
