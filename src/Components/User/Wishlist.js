import React, { useState, useEffect, useContext } from 'react'
import { Grid, Container, Paper, IconButton, Divider, Button, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../Routes';
import SingleProduct from '../Sections/SingleProduct';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    paper: {
        background:'unset',
        margin:'5px 0'
    },
}))


export default function Wishlist() {

    const classes = useStyles();

    const { wishListItems,wishListItemsLoading } = useContext(AppContext);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div style={{padding:'10px 0'}}>
            <h5 style={{ fontWeight: 700,margin:'1rem 0'}}>Wishlist</h5>

            <Paper variant='outlined' square className={classes.paper}>
            {

                wishListItemsLoading ?

                    <div className='d-flex justify-content-center align-items-center' style={{minHeight:'300px'}}>

                        <CircularProgress
                            size={24}
                        />
                    </div> 

                    :
                    <Grid container spacing={0}>
                        {
                            wishListItems.length > 0 ?
                                wishListItems.map((item, index) => (
                                    <Grid item xs={6} md={3} key={index}>
                                        <SingleProduct product={item.product} loading={false} />
                                    </Grid>
                                ))
                                :
                                <p className='mt-3 ml-1'>You Don't Have Any Items In Your Wishlist</p>
                        }

                    </Grid>
            }
            </Paper>
        </div>
    )
}
