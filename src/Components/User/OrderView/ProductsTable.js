import React, { useState, useContext } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import { OrderContext } from './OrderView';
import { useEffect } from 'react';

export default function ProductsTable({items,usedFor}) {
    // const { order } = useContext(usedFor);

    const [data, setData] = useState([])
    const [columns, setColumns] = useState([
        {
            title: 'SKU',
            field: 'sku',
            cellStyle: {
                textAlign: 'center',
                padding:'3px'

            },
       
        },
        {
            title: 'Name',
            field: 'name',
            cellStyle: {
                textAlign: 'center',
            },
          
        },
        {
            title: 'Price',
            field: 'price',
            cellStyle: {
                textAlign: 'center',
            },
          
        },
        {
            title: 'Quantity',
            field: 'quantity',
            cellStyle: {
                textAlign: 'center',
            },
        },
        {
            title: 'Item Status',
            field: 'item_status',
            cellStyle: {
                textAlign: 'center',
                padding:0,
            },
            render: (rowdata) =>
                <>
                    {
                        Object.keys(rowdata.item_status).map((item) => (
                            
                            <div className="d-flex justify-content-between">
                                <span>{item} :</span>
                                <span>{rowdata.item_status[item]}</span>
                            </div>
                        ))
                    }
                </>

        },
        {
            title: 'SubTotal',
            field: 'subtotal',
            width: '50px',
            cellStyle: {
                textAlign: 'center',
            },
        },
        {
            title: 'Discount',
            field: 'discount',
            width: '50px',
            cellStyle: {
                textAlign: 'center',
            },
        },
        {
            title: 'Tax',
            field: 'tax',
            width: '50px',
            cellStyle: {
                textAlign: 'center',
            },
        },
        {
            title: 'Grand Total',
            field: 'grand_total',
            width: '50px',
            cellStyle: {
                textAlign: 'center',
            },
        },


    ])


    useEffect(() => {
        setData(items.map((item) => (
            {
                sku: item.sku,
                name: item.name,
                price: item.formated_price,
                item_status: {
                    ordered: item.qty_ordered,
                    canceled: item.qty_canceled,
                    invoiced: item.qty_invoiced,
                    shipped: item.qty_shipped
                },
                subtotal: item.formated_total,
                discount: item.formated_discount_amount,
                tax: `${item.formated_tax_amount} (${item.tax_percent * 1}%)`,
                grand_total: item.formated_grant_total,
                quantity: item.qty_ordered
            }
        )))
    }, [])
    return (

        <MaterialTable
            style={{ boxShadow: 'unset',background:'unset' }}
            title=""
            columns={
                usedFor == 'orderview' ? 
                columns.filter((item)=>item.field != 'quantity') 
                :
                columns.filter((item)=>item.field != 'item_status')
            }
            data={data}

            options={{
                actionsColumnIndex: -1,
                headerStyle: { backgroundColor: '#F1CB29', fontWeight: 'bold',textAlign:'center'},
                search: false,
                paging: false,
                sorting:false
            }}
            components={{
                Toolbar: props => (
                    <div style={{ height: '20px' }}>
                        <MTableToolbar {...props} />
                    </div>
                )
            }}

        />
    )
}
