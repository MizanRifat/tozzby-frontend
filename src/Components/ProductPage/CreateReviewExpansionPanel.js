import React, { useState, useContext } from 'react';
import ProductExpansionPanel from './ProductExpansionPanel';
import Rating from '@material-ui/lab/Rating';
import { Button, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { AppContext } from '../../Routes';
import NotiToast from '../Common/NotiToast';

export default function CreateReviewExpansionPanel({ id, reviews, setReviews }) {



    return (

        <ProductExpansionPanel
            summary='Write Your Review'
            rich={false}
            details={<CreateReview id={id} reviews={reviews} setReviews={setReviews} />}
        />
    )

}

function CreateReview({ id, reviews, setReviews }) {

    const { user, setAuthOpen } = useContext(AppContext);
    const toast = NotiToast();

    const [data, setData] = useState({
        rating: 1,
        comment: '',
        loading: false
    })

    const handleSubmit = () => {
        setData({
            ...data,
            loading: true
        })
        axios.post(`${process.env.REACT_APP_DOMAIN}/api/reviews/${id}/create?token=true`,

            {
                rating: data.rating,
                comment: data.comment
            }

            , {
                withCredentials: true
            }).then(response => {
                setData({
                    ...data,
                    rating: 1,
                    comment: '',
                    loading: false
                })
                setReviews({
                    ...reviews,
                    reviews: [...reviews.reviews, response.data.data]
                })
                toast(response.data.message, 'success')

            }).catch(error => {
                setData({
                    ...data,
                    rating: 1,
                    comment: '',
                    loading: false
                })
            })
    }
    const handleRatingChange = (e, value) => {
        setData({
            ...data,
            rating: value
        })
    }
    const handleCommentChange = (e) => {
        setData({
            ...data,
            comment: e.target.value
        })
    }
    return (
        <div>
            {
                (Object.entries(user).length == 0) ?
                    <div>
                        <p>You Need To Login To Complete This Action.</p>
                        <Button variant='contained' color='primary' size='small' className='butn' onClick={() => setAuthOpen({
                            state: true,
                            comp: 1,
                            title:'Login'
                        })}>Login</Button>
                    </div>
                    :
                    <>
                        <div className="text-center">
                            <h5>Give A Rating...</h5>
                            <Rating name="size-medium" defaultValue={1} onChange={handleRatingChange} value={data.rating} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1" style={{ fontWeight: 700 }}>Review</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} onChange={handleCommentChange} value={data.comment} />
                        </div>


                        <div className="mt-3" style={{ position: 'relative' }}>
                            <Button
                                variant='contained'
                                onClick={handleSubmit}
                                color='primary'
                                disabled={data.loading}
                                style={{ borderRadius: 0, }}
                            >
                                Submit
                            </Button>
                            {
                                data.loading &&
                                <CircularProgress
                                    size={24}
                                    style={{
                                        position: 'absolute',
                                        left: '27px',
                                        top: '6px'
                                    }}
                                />
                            }
                        </div>
                    </>
            }

        </div>
    )
}


