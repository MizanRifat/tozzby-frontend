import React, { useState, useEffect, useContext,useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Tooltip from '@material-ui/core/Tooltip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import axios from 'axios'
import { AppContext } from '../../Routes';
import NotiToast from '../Common/NotiToast';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { useHistory } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import Rating from '@material-ui/lab/Rating';
import useWishList from '../Common/useWishList';
import useCartItem from '../Common/useCartItem';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '140px',
        margin: '10px',
        flex: '0 0 auto',
        position: 'relative',
        cursor: 'pointer',
        

    },

    media: {
        height: '170px',
        margin: '15px 0'
    },
    name: {
        padding: '0 !important',
        margin: '0 !important',
        marginTop: '10px',
        fontSize: '16px',
        // fontWeight: 700
    },
    pricetag: {
        fontWeight: 700,
        fontSize: '18px !important',
        color: '#FF5C00',
        display: 'inline'
    },
    options: {
        background: '#fff',
        padding: '0 7px',
        transform: 'translateY(-145px)',
        transition: '.2s ease-out',
        opacity: '1 !important'

    },


    fIcon: {

        color: '#FF7426',
        padding: '3px',
        '&:hover': {
            color: 'white',
        },

    },
    animate: {
        animation: `$spin 2000ms linear infinite`
    },
    iconContainer: {
        border: '1px solid #FF7426',
        borderRadius: '50%',
        padding: '3px',
        '&:hover': {
            color: 'white',
            background: '#ff7426',
            cursor: 'pointer'

        }
    },
    optionContainer: {
        position: 'absolute',
        top: '140px',
        zIndex: 3
    },
    "@keyframes spin":
    {
        "100%": {
            transform: "rotate(360deg)"
        }
    },
    skeleton:{
        minWidth:'140px',
        margin:'10px'
    }
}));

export default function SingleProduct(props) {

    const { product } = props;
    const { loading = true } = props;
    const { wishlist = false } = props;
    const history = useHistory();
    const classes = useStyles();

    const [showOptions, setShowOptions] = useState(false)

    const [inWishList, inWishListPending, toWishList, setWishListProduct] = useWishList();
    const { inCart, inCartPending, addToCart, removeFromCart, setCartItemProduct,ref} = useCartItem();

  

    const toast = NotiToast();

    const mouseEnter = (e)=>{
        e.preventDefault()
        setShowOptions(true)
        console.log('enter')
    }
    
    const mouseLeave = (e)=>{
        e.preventDefault()
        setShowOptions(false)
        console.log('leave')
    }


    useEffect(() => {

        setWishListProduct(product)
        setCartItemProduct(product)
    }, [product])

    return (

        <>

            {
                loading ?
                    <div>
                        <Skeleton animation='wave' height='200px'  animation='wave' className={classes.skeleton} />
                        <Skeleton animation='wave' height='50px' animation='wave' className={classes.skeleton}/>
                        <Skeleton animation='wave' height='50px'  animation='wave' className={classes.skeleton} />
                    </div>

                    :



                    <Card 
                        className={`${classes.root} productWrapper`} 
                        onMouseEnter={mouseEnter} 
                        onMouseLeave={mouseLeave}
                        >

                        <Link href={`/product/${product.id}`}>
                           
                            <CardMedia
                                className={classes.media}
                                image={product.base_image[0].url}
                                title={product.name}
                                style={{ backgroundSize: 'contain' }}
                            />

                        </Link>

                        <CardContent className='text-center p-0 mt-2 position-relative'>



                            <div className="" style={{ height: '37px' }}>
                                <h5 className={classes.name}>
                                    {
                                        product.name.length > 30 ?
                                            `${product.name.substring(0, 30)}...`
                                            :
                                            product.name
                                    }
                                </h5>
                            </div>


                            <div className="d-block" style={{height:'16px'}}>
                                <Rating 
                                    name="half-rating-read" 
                                    defaultValue={product.reviews.average_rating} 
                                    precision={0.5} 
                                    readOnly
                                    style={{fontSize:'12px'}} 
                                />
                            </div>

                            {
                                product.hasOwnProperty('formated_special_price') ?
                                    <div className="d-flex justify-content-center">
                                        <div className={classes.pricetag} style={{ marginRight: '5px' }}>{product.formated_special_price}</div>
                                        <div className={classes.pricetag} style={{ textDecoration: 'line-through', fontWeight: 100 }}>{product.formated_price}</div>
                                    </div>
                                    :
                                    <p className={classes.pricetag}>{product.formated_price}</p>
                            }

                            <div className={`${classes.optionContainer} ${showOptions ? classes.options : ''}`} style={{ opacity: 1, width: '100%', height: '40px' }}>
                                <div className="d-flex justify-content-around">

                                    {
                                        inCart ?

                                            <Tooltip title="Remove From Cart">
                                                <div className={classes.iconContainer}>
                                                    <RemoveShoppingCartIcon className={clsx(classes.fIcon, { animate: inCartPending })} onClick={removeFromCart} />
                                                </div>
                                            </Tooltip>

                                            :

                                            <Tooltip title="Add To Cart">
                                                <div className={classes.iconContainer}>
                                                    <ShoppingCartIcon className={clsx(classes.fIcon, { animate: inCartPending })} onClick={() => addToCart(1)} />
                                                </div>
                                            </Tooltip>

                                    }

                                    {
                                        inWishList ?

                                            <Tooltip title="Remove From Wishlist">
                                                <div className={classes.iconContainer}>
                                                    <FavoriteIcon className={clsx(classes.fIcon, { animate: inWishListPending })} onClick={toWishList} />
                                                </div>
                                            </Tooltip>
                                            :
                                            <Tooltip title="Add To Wishlist">
                                                <div className={classes.iconContainer}>
                                                    <FavoriteBorderIcon className={clsx(classes.fIcon, { animate: inWishListPending })} onClick={toWishList} />
                                                </div>
                                            </Tooltip>
                                    }


                                    <Tooltip title="Compare">
                                        <div className={classes.iconContainer}>
                                            <CompareArrowsIcon className={classes.fIcon} />
                                        </div>
                                    </Tooltip>

                                    
                                    
                                </div>
                            </div>


                        </CardContent>
                    </Card>
            }

            <div ref={ref} />
        </>
    );
}
