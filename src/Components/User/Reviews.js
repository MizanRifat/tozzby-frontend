import React, { useState, useEffect, useContext } from 'react'
import { Grid, Container, Paper, IconButton, Divider, Button, Chip, Tooltip, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../Routes';
import { ProfileContext } from './UserBody';
import SingleProduct from '../Sections/SingleProduct';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotiToast from '../Common/NotiToast';
import dateFormat from 'dateformat';


const useStyles = makeStyles((theme) => ({
    // paper: {
    //     backgroundColor: theme.palette.background.paper,
    //     padding: '20px',
    //     border: 0,
    //     ['@media (max-width:480px)']: { 
    //         padding:'10px',
    //         margin:'10px 0'
    //     }
    // },
    paper:{
        background:'unset',
        padding: '10px',
        marginBottom:'5px'
        // ['@media (max-width:480px)']: { 
        //     padding:'10px',
        //     margin:'10px 0'
        // }

    },
    image: {
        marginTop: '7px'
    },
    iconContainer: {
        width: '32px',
        border: '1px solid black',
        borderRadius: '50%',
        padding: '3px',
        '&:hover': {
            color: 'white',
            background: '#ff7426',
            cursor: 'pointer'

        }
    },
    fIcon: {

    }
}))


export default function Reviews() {

    const classes = useStyles();

    const { user, wishListItems } = useContext(AppContext);
    const { reviews, setReviews } = useContext(ProfileContext);


    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/reviews?customer_id=${user.id}`, {
            withCredentials: true
        })
            .then(response => {
                setReviews({
                    reviews: response.data.data,
                    loading: false
                })
            }).catch(error => {
                setReviews({
                    ...reviews,
                    loading: false
                })
            })
    }, []);

    return (
        <div style={{padding:'10px 0'}}>
            <h5 style={{ fontWeight: 700,margin:'1rem 0' }}>Reviews</h5>
            {

                reviews.loading ?

                    <div className='d-flex justify-content-center align-items-center' style={{minHeight:'200px'}}>

                        <CircularProgress
                            size={24}
                        />
                    </div> 

                    :
                    <Grid container spacing={0}>
                        {
                            reviews.reviews.length > 0 ?
                                reviews.reviews.map((item, index) => (
                                    
                                        <SingleItem item={item} reviews={reviews} setReviews={setReviews} />
                                    
                                ))
                                :
                                <p className='mt-3 ml-1'>You Don't Have Any Items</p>
                        }

                    </Grid>
            }
        </div>
    )
}


function SingleItem({ item, reviews, setReviews }) {
    const classes = useStyles();
    const toast = NotiToast();

    const [dltLoading, setDltLoading] = useState(false);

    const handleDelete = (id) => {
        setDltLoading(true)
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/reviews/delete/${id}?token=true`, {
            withCredentials: true
        })
            .then(response => {
                setDltLoading(false)
                setReviews({
                    ...reviews,
                    reviews: reviews.reviews.filter(item => item.id != id)
                })
                toast(response.data.message, 'success')
            }).catch(error => {
                setDltLoading(false)
                console.log({ error })
            })
    }
    return (
        <Paper variant="outlined" square className={classes.paper}>
            <Grid container spacing={0}>
                <Grid item xs={12} md={2} >
                    <img src={item.product.base_image.small_image_url} className={classes.image} />
                </Grid>
                <Grid item xs={12} md={10}>
                    <Link href={`/product/${item.product.id}`} style={{ color: 'black', display: 'block' }}>
                        {item.product.name}
                    </Link>
                    <div className='d-flex justify-content-between'>
                        <div style={{marginTop:'5px'}}>
                            <div style={{ fontSize: '12px' }}>
                                {dateFormat(item.created_at, 'd mmmm, yyyy')}
                            </div>
                            <Rating
                                name="half-rating-read"
                                defaultValue={item.rating}
                                readOnly
                                style={{ fontSize: '14px' }}
                            />
                        </div>
                        {
                            dltLoading ?
                                <CircularProgress size={20} />
                                :
                                <Tooltip title="Delete Review">

                                    <IconButton className={clsx(classes.fIcon, { animate: false })} onClick={() => handleDelete(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                        }
                    </div>

                    <div className="">
                        {item.comment}
                    </div>
                </Grid>
            </Grid>
            

        </Paper>
    )
}