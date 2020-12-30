import React, { useContext } from 'react';
import ProductExpansionPanel from './ProductExpansionPanel'
import { Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import { ProductContext } from './Product';



const useStyles = makeStyles(() => ({
    track: {
        background: 'red',
        height: '3px'
    },
    thumb: {
        display: 'none'
    },
    
    ['@media (pointer: coarse)']: { 
        root:{
            padding:'13px 0'
        }
    },
}))



export default function RatingExpansionPanel() {
    
    return (
        <ProductExpansionPanel
            summary='Customer Rating'
            rich={false}
            details={<RatingsDetails />}
        />
    )
}

function RatingsDetails() {

    const { product } = useContext(ProductContext)
    let percentages = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };

    if (product.reviews.percentage.length > 0) {
        percentages = JSON.parse(product.reviews.percentage)
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
                <p>{product.reviews.average_rating} star</p>
                <Rating name="half-rating-read" defaultValue={product.reviews.average_rating} precision={0.5} readOnly />
                <p>{product.reviews.average_rating} Ratings & {product.reviews.total} Reviews</p>
            </Grid>
            <Grid item xs={12} sm={6}>
                {
                    [5, 4, 3, 2, 1].map((item, index) => (
                        <RatingSlider no={item} value={percentages[item]} />
                    ))
                }


            </Grid>
        </Grid>
    )

}

function RatingSlider({ no, value }) {
    const classes = useStyles();
    return (

        <div className="d-flex justify-content-between">
            <div className='col-2 p-0 m-0'>{no} <StarIcon style={{ color: '#FFB400' }} /></div>
            <div className="col-9" >
                <Slider disabled defaultValue={value} classes={{ root: classes.root, track: classes.track, thumb: classes.thumb }} />
            </div>

            <div className='col-1 m-0'>{}</div>

        </div>
    )
}
