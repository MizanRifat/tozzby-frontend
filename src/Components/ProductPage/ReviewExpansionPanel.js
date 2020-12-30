import React, { useState, useEffect, useContext } from 'react'
import ProductExpansionPanel from './ProductExpansionPanel'
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';
import { ProductContext } from './Product';
import Axios from 'axios';
import dateFormat from 'dateformat';
import { CircularProgress } from '@material-ui/core';


const useStyles = makeStyles(() => ({

}))



export default function ReviewExpansionPanel({ id, reviews, setReviews }) {

    return (
        <ProductExpansionPanel
            summary='Reviews'
            rich={false}
            details={<ReviewDetails id={id} reviews={reviews} setReviews={setReviews} />}
        />
    )
}




function ReviewDetails({ id, reviews, setReviews }) {
    const classes = useStyles();

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_DOMAIN}/api/reviews?product_id=${id}`)
            .then(response => {
                setReviews({
                    ...reviews,
                    reviews: response.data.data,
                    fetchLoading: false
                })
            }).catch(error => {
                setReviews({
                    ...reviews,
                    fetchLoading: false
                })
            })
    }, [])

    return (
        reviews.fetchLoading ?
            <div className="d-flex justify-content-center">
                <CircularProgress
                    size={24}
                
                />
            </div>
            :
            reviews.reviews.length == 0 ?
                <p>No Review Available</p> :

                reviews.reviews.map((item, index) => (
                    <>
                        <SingleReview key={index} review={item} />

                        {
                            index != reviews.length - 1 ? <Divider style={{ margin: '10px  0' }} /> : ''
                        }

                    </>
                ))
    )
}

function SingleReview({ review }) {
    return (
        <>
            <div className="d-flex justify-content-between">
                <div>
                    <Rating name="half-rating-read" defaultValue={review.rating} precision={0.5} readOnly />

                    <div style={{ fontSize: '14px' }}>by <span style={{ fontSize: '16px', fontWeight: 700 }}>{review.name}</span></div>
                </div>
                <div style={{ fontSize: '12px' }}>{dateFormat(review.created_at, 'd mmmm, yyyy')}</div>

            </div>
            <div className="">{review.comment}</div>


        </>

    )
}
