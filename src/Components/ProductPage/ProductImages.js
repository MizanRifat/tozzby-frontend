import React,{useState,useContext} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MySLider from '../Common/MySLider';
import {ProductContext} from './Product';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
    picContainer: {
        textAlign: 'center',
        transition:'.3s ease-in',
        width:'100%',
        height:450
    },
    mainImage: {
        width: '100%',
        height: '100%',
        objectFit:'contain'
    },
    thumbnail: {
        flex: '0 0 auto',
        margin: '5px',
        height: '100px',
        width: '100px',
        border: '1px solid black',
        '&:hover': {
            border: '1px solid red',
        },
        
    },
    cont:{
        '&:focus':{
            outline:'none'
        }
    },
    thumbnailImage:{
        height:'100%',
        backgroundSize:'contain',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat'
    }
}))

export default function ProductImages() {
    const classes = useStyles();

    const {product} = useContext(ProductContext)

    const [selectedImage, setselectedImage] = useState(0)

    return (
        <>
            {
                window.innerWidth < 480 &&
                <div className='my-3'>    
                    <h5>{product.name}</h5>
                    <Rating name="half-rating-read" defaultValue={product.reviews.average_rating} precision={0.5} readOnly />
                </div>
            }

            <div className={classes.picContainer}>
                <img src={product.images[selectedImage].original_image_url} className={classes.mainImage} />
            </div>

            <div>
                <MySLider>

                    {
                        product.images.map((item, index) => (
                            <div onClick={()=>setselectedImage(index)} className={classes.cont}>
                                <div key={index} className={classes.thumbnail}>
                                    <div className={classes.thumbnailImage} 
                                    style={{ backgroundImage: `url(${item.original_image_url})`, }}/>
                                </div>
                            </div>
                        ))
                    }


                </MySLider>

            </div>
        </>
    )
}
