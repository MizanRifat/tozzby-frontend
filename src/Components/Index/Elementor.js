import React, { useEffect,useState } from 'react'
import { Paper, Grid } from '@material-ui/core';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { makeStyles } from '@material-ui/styles';
import useLoadingBar from '../Common/useLoadingBar';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '3rem',
        color: '#FF6108'
    },
    text: {
        margin: 0,
        fontWeight: 700,
        '&:hover': {
            color: '#FF6108'
        }

    },
    itemContainer:{
        padding: '20px', 
        justifyContent: 'start',
        display:'flex',
        ['@media (max-width:480px)']: { 
            padding:'5px',
            marginLeft:'70px'
        },
        ['@media (min-width:960px)']: { 
            justifyContent: 'center',
        },
    }

}))

export default function Elementor({ addLoadingBar }) {

    const classes = useStyles();

    const [items, setitems] = useState([
        {
            icon:<LocalShippingOutlinedIcon className={classes.icon} />,
            title:'Free Delivery',
            label:'From 99$'
        },
        {
            icon:<MonetizationOnOutlinedIcon className={classes.icon} />,
            title:'Moneyback Guarantee',
            label:'1 Week Back'
        },
        {
            icon:<PaymentOutlinedIcon className={classes.icon} />,
            title:'Payment Method',
            label:'Secure Payment'
        },
        {
            icon:<ContactSupportOutlinedIcon className={classes.icon} />,
            title:'Support',
            label:'24 hours'
        },
    ])
 
    useEffect(() => {
        addLoadingBar(10)
    }, [])



    return (
        <>
            <Paper elevation={0} variant='outlined' style={{ marginTop: '2rem' }}>
                <Grid container  >


                    {
                        items.map((item,index)=>(
                            <Grid item xs={12} sm={6} md={3}>
                                <div className={classes.itemContainer}>
                                    {item.icon}
                                    <div className="ml-2" style={{ fontFamily: 'sans-serif', }}>
                                        <p className={classes.text}>{ item.title }</p>
                                        <p style={{ margin: 0, color: '#666695' }}>{item.label}</p>
                                    </div>
                                </div>
                            </Grid>
                        ))
                    }

                </Grid>
            </Paper>
        </>
    )
}


