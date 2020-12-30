import React, { useState, useContext, useEffect } from 'react'
import { Paper, IconButton, Tooltip, Chip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import ProfileEdit from './ProfileEdit';
import PersonIcon from '@material-ui/icons/Person';
import { AppContext } from '../../Routes';
import MaterialTable,{ MTableToolbar } from 'material-table'
import axios from 'axios';
import dateFormat from 'dateformat';
import { useHistory } from 'react-router-dom';

import {ProfileContext} from './UserBody';


const StyledMTableToolbar = withStyles({
    root: {
        ['@media (max-width:480px)']: { 
            paddingLeft:'0 !important'
        }
    },
    spacer:{
        ['@media (max-width:480px)']: { 
            flex:'unset'
        }
    },
    searchField:{
        // paddingLeft:0
    }
  })(MTableToolbar);

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
        border: 0,
        ['@media (max-width:480px)']: { 
            padding:'10px',
            margin:'10px 0'
        }
    },
    tag: {
        fontWeight: 'bold',
        marginRight: '20px',
        fontSize: '16px',
        flex: 1
    },
    name: {
        fontSize: '16px',
        flex: 4
    }
}))


export default function Orders() {

    const history = useHistory();
    const classes = useStyles();

    const {orders, setOrders} = useContext(ProfileContext);

    const [data, setData] = useState([]);


    useEffect(() => {

        axios.get(`${process.env.REACT_APP_DOMAIN}/api/orders?token=true&pagination=0`,
            {
                withCredentials: true
            }
        ).then(response => {
            setOrders({
                orders:response.data.data,
                loading: false
            })
        }).catch(error => {
            console.log(error)
            setOrders({
                ...orders,
                loading: false
            })
        })
    }, [])

    useEffect(() => {
        setData(orders.orders.map((item) => (
            {
                order_id: item.id,
                date: dateFormat(item.created_at, 'd mmmm, yyyy h:M TT'),
                total: item.formated_grand_total,
                status: item.status_label,
                id: item.id
            }
        )))
    }, [orders])

    return (
        <div style={{padding:'10px 0'}}>
            <h5 style={{ fontWeight: 700,margin:'1rem 0'}}>Orders</h5>

            <MaterialTable
                style={{ boxShadow: 'unset',background:'unset' }}
                title=""
                isLoading={orders.loading}
                columns={[
                    {
                        title: 'Order ID',
                        field: 'order_id',
                        cellStyle: {
                            textAlign: 'center'
                        },
                        headerStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Date',
                        field: 'date',
                        cellStyle: {
                            textAlign: 'center'
                        },
                        headerStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Total',
                        field: 'total',
                        cellStyle: {
                            textAlign: 'center',
                            marginLeft: '5px'
                        },
                        headerStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Status',
                        field: 'status',
                        cellStyle: {
                            padding: '20px',
                            textAlign: 'center'
                        },
                        headerStyle: {
                            textAlign: 'center',
                        },
                        render: (rowdata) =>
                            <Chip
                                label={rowdata.status}
                                color='primary'
                                className={rowdata.status != '' && rowdata.status}
                                // style=
                            />
                    },

                ]}
                data={data}
                actions={[
                    {
                        icon: 'visibility',
                        tooltip: 'View Order',
                        onClick: (event, rowData) => history.push(`/account/order/view/${rowData.id}`)
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    headerStyle: { backgroundColor: '#F1CB29', fontWeight: 'bold' },
                    pageSize:orders.orders.length > 10 ? 10 : 5
                }}
                components={{
                    Toolbar: props => (
                        
                            <StyledMTableToolbar {...props} />
                        
                    )
                }}

            />

        </div>
    )
}

