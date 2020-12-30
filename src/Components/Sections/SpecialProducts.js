import React, { useState, useEffect } from 'react'
import { Paper, Grid, Hidden } from '@material-ui/core';
import SingleProduct from './SingleProduct';
import { makeStyles } from '@material-ui/core/styles';
import Countdown from 'react-countdown-now';

import MySLider from '../Common/MySLider';
import Axios from 'axios';

const useStyles = makeStyles({
    title: {

        display: 'flex',
        position: 'absolute',
        top: '-45px'
    },
    titleText: {
        background: '#FF5C00',
        color: 'white',
        padding: '8px 10px',
        borderRadius: '5px 5px 0px 0px',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    flashText: {
        padding: '8px 10px',
        fontWeight: 'bold',
        fontSize: '20px',
        borderBottom: '2px solid #FF5C00'

    },
    countdown: {
        position: 'absolute',
        left: '150px',
        fontSize: '30px'
    },
    span: {
        background: '#FF5C00',
        padding: '0px 7px',
        color: 'white',
        borderRadius: '3px'
    },
    cBanner: {
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    bannerContainer: {
        height: '258px',
        // width: '260px',
        padding: '10px 0px 0px 10px ',
    },
    categoryContainer: {
        padding: '8px 25px !important'
        // ['@media (max-width:780px)']: {
        //     display: 'none'
        // }
    },
    productContainer: {
        // padding: '0 30px',
        ['@media (max-width:480px)']: {
            // padding: '0 8px'
        }

    },
    paperRoot: {
        background:'unset',
        position: 'relative',
    }

})

export default function SpecialProducts( {products,loading} ) {

    const classes = useStyles();

    return (
        <>
            {
                // loading ? '' :

                    <div>

                        <Paper elevation={0} className={classes.paperRoot}>

                            <Grid container >
                                        <Grid item xs={12} style={{ paddingLeft: 0 }}>
                                            {/* <div className={classes.productContainer}> */}
                                                <MySLider slidesToShow={6}>
                                                    {
                                                        products.map((item, index) => (
                                                            <SingleProduct product={item} key={index} loading={loading}/>
                                                        ))
                                                    }

                                                </MySLider>

                                            {/* </div> */}
                                        </Grid>

                            </Grid>

                        </Paper>
                    </div>
            }
        </>
    )
}


