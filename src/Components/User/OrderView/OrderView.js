import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SimpleTabs from './SimpleTabs';
import CircularProgress from '@material-ui/core/CircularProgress';


export const OrderContext = createContext();

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        // padding: '20px',
        border: 0,
        marginTop: '20px'
    },
    tabRoot: {
        fontWeight: 700,
        fontSize: '16px',
    },
    name: {
        fontSize: '16px',
        flex: 4
    }
}))

export default function OrderView(props) {
    const classes = useStyles();

    const id = props.match.params.id
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);

    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/orders/${id}?token=true`,
            {
                withCredentials: true
            }
        ).then(response => {
            setOrder(response.data.data)
            setLoading(false)
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }, [])

    return (
        <>
            {
                true ?

                    <div className='d-flex justify-content-center align-items-center' style={{minHeight:'300px'}}>

                        <CircularProgress
                            size={24}
                        />
                    </div> 

                    :
                <div style={{padding:'10px 0'}}>
                    {
                        Object.entries(order).length != 0 &&
                        <>
                            <h5 style={{ fontWeight: 700,margin:'1rem 0'}}>Order #{`${id}`}</h5>

                            <OrderContext.Provider value={{ order }}>
                                <SimpleTabs />
                            </OrderContext.Provider>
                        </>
                    }
                </div>
            }
        </>
    )
}

