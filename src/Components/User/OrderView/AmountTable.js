import React from 'react'

export default function AmountTable({order,usedFor}) {
    return (
        <>
            <table width='250px'>
                <tr>
                    <th style={{ width: '150px' }}></th>
                    <th style={{ width: '30px' }}></th>
                    <th style={{ width: '70px' }}></th>
                </tr>
                <tr>
                    <td>SubTotal</td>
                    <td>-</td>
                    <td>{order.formated_sub_total}</td>
                </tr>
                <tr>
                    <td>Discount</td>
                    <td>-</td>
                    <td>{order.formated_discount_amount}</td>
                </tr>
                <tr>
                    <td>Tax</td>
                    <td>-</td>
                    <td>{order.formated_tax_amount}</td>
                </tr>
            </table>

            <hr />

            <table width='250px' style={{ fontWeight: 700 }}>
                <tr>
                    <th style={{ width: '150px' }}></th>
                    <th style={{ width: '30px' }}></th>
                    <th style={{ width: '70px' }}></th>
                </tr>

                <tr>
                    <td>Grand Total</td>
                    <td>-</td>
                    <td>{order.formated_grand_total}</td>
                </tr>

                {
                    usedFor == 'infoTab' &&
                    <>
                        <tr>
                            <td>Total Paid</td>
                            <td>-</td>
                            <td>{order.invoices.length == 0 ? '$0.00' : order.formated_grand_total}</td>
                        </tr>
                        <tr>
                            <td>Total Refunded</td>
                            <td>-</td>
                            <td>{order.formated_grand_total_refunded}</td>
                        </tr>
                        <tr>
                            <td>Total Due</td>
                            <td>-</td>
                            <td>{order.invoices.length != 0 ? '$0.00' : order.formated_grand_total}</td>
                        </tr>
                    </>

                }

            </table>
        </>
    )
}
