import React, { useState, useEffect, useContext } from 'react'
import { Grid, Container, Paper, IconButton, Divider, Button, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Quantity from '../Common/Quantity'
import axios from 'axios';
import { AppContext } from '../../Routes';
import NotiToast from '../Common/NotiToast'
import CancelIcon from '@material-ui/icons/Cancel';
import { Link, useHistory } from 'react-router-dom';
import Auth from '../Auth/Auth';
import useWishList from '../Common/useWishList';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CircularProgress from '@material-ui/core/CircularProgress';
import useLoadingBar from '../Common/useLoadingBar';
import useCartItem from '../Common/useCartItem';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%'
    },
    image2:{
        height: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    paper: {
        padding: '5px',
        background: 'unset',
        // border: 'none',
        margin: '10px 0'
    },
    btn: {
        padding: '0 6px',
        '&:focus': {
            outline: 'none'
        },
        ['@media (max-width:480px)']: { 
            padding:0,
        },
    },
    couponBox: {
        borderRadius: 0,
        border: '1px solid #303F9F'
    },
    checkoutBtn: {
        background: '#D0611E',
        color: 'white',
        borderRadius: 0,
        width: '100%',
        marginTop: '24px',
        '&:hover': {
            background: '#FF5420',
            color: 'white'
        }
    },
    updtBtn: {
        // background: '#FF5420',
        // color: 'white',
        borderRadius: '0px',
        '&:hover': {
            // background: '#CC4A00',
            // color: 'white',
        },
        '&:focus': {
            outline: 'none'
        },
        ['@media (max-width:480px)']: { 
            padding:0,
            fontSize:'10px'
        },
    },
    buttonProgress: {
        position: 'absolute',
    },
    fIcon:{
        ['@media (max-width:480px)']: { 
            // padding:0,
            fontSize:'20px'
        },
    }

}))

export default function Cart() {


    const { user, cartItems, setCartItems, cartItemsLoading, setAuthOpen, wishListItems, setWishListItems, dispatchLoadingBarProgress } = useContext(AppContext);
    const [addLoadingBar, loadingBarJsx] = useLoadingBar();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);



    const classes = useStyles();

    useEffect(() => {
        addLoadingBar(50)
    }, []);
    useEffect(() => {
        if (!cartItemsLoading) {
            addLoadingBar(50)
        }
    }, [cartItemsLoading]);




    return (
        <>
            {loadingBarJsx}

            {
                cartItemsLoading ?

                <div className='d-flex justify-content-center align-items-center' style={{minHeight:'400px'}}>

                    <CircularProgress
                        size={24}
                    />
                </div> 

                :
        
                <Container>
                    <Paper variant="outlined" square className={classes.paper} style={{ border: 'none' }}>
                        <div className="">
                            <h5 style={{ fontWeight: 700 }}>Shopping Cart</h5>
                        </div>
                    </Paper>
                    <Grid container spacing={3}>

                        <Grid item xs={12} sm={8}>
                            {
                                Object.entries(cartItems).length > 0 ?
                                    <>
                                        {
                                            cartItems.items.map((item, index) => (

                                                <Paper variant="outlined" key={index} square className={classes.paper}>
                                                    <SingleItem
                                                        item={item}
                                                        setCartItems={setCartItems}
                                                        wishListItems={wishListItems}
                                                        setWishListItems={setWishListItems}
                                                    />
                                                </Paper>

                                            ))
                                        }

                                    </>

                                    :
                                    <div className="text-center mt-5">
                                        <h5>Cart Is Empty</h5>
                                    </div>
                            }

                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Paper variant="outlined" square className={classes.paper}>
                                <CartSummary cart={cartItems} setCart={setCartItems} addditionalData={true} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container >

            }
        </>
    )
}


function SingleItem({ item, setCartItems, wishListItems, setWishListItems }) {

    const classes = useStyles();
    const [quantity, setQuantity] = useState(item.quantity);
    const toast = NotiToast();


    const [inWishList, inWishListPending, toWishList, setWishListProduct] = useWishList();

    const { inCart, inCartPending, addToCart, removeFromCart, setCartItemProduct, updateCartItem } = useCartItem();

    useEffect(() => {
        setWishListProduct(item.product)
        setCartItemProduct(item.product)
    }, [item])


    return (
        window.innerWidth > 480 ?

            <div className="row mt-2">

                <div className="col-2">
                    <Link to={`/product/${item.product.id}`}>
                        <img src={item.product.base_image[0].small_image_url} className={classes.image} />
                    </Link>
                </div>
                <div className="col-3 mt-3">

                    <p className="" style={{ fontWeight: 700, fontSize: '16px' }}> {item.product.name} </p>

                    <div className="mt-2">


                        <Tooltip title={inWishList ? 'Remove From WishList' : "Add To Wishlist"} >
                            <IconButton className={classes.btn} onClick={toWishList}>
                                {
                                    inWishList ?
                                        <FavoriteIcon className={clsx(classes.fIcon, { animate: inWishListPending })} />
                                        :
                                        <FavoriteBorderIcon className={clsx(classes.fIcon, { animate: inWishListPending })} />
                                }

                            </IconButton>
                        </Tooltip>



                        <Tooltip title="Remove Item From Cart">
                            <IconButton className={classes.btn} onClick={removeFromCart}>
                                <DeleteIcon className={clsx(classes.fIcon, { animate: inCartPending })} />
                            </IconButton>
                        </Tooltip>
                    </div>

                </div>
                <div className="col-3 mt-3 text-center">
                    <div className="font-weight-bold" style={{ fontSize: "16px" }}>{item.formated_price}</div>


                </div>
                <div className="col-2 mt-3">

                    <Quantity quantity={quantity} setQuantity={setQuantity} />

                    <div className="text-center mt-2">
                        <Button variant='contained' size='small' color='primary' className={classes.updtBtn} onClick={() => updateCartItem(quantity)}>Update</Button>
                    </div>
                </div>
                <div className="col-2 text-center mt-3">
                    <p style={{ fontWeight: 700 }}>SubTotal</p>
                    <div className="font-weight-bold" style={{ fontSize: "16px" }}>${item.price * quantity}</div>
                </div>

            </div>
        :
        <div className='d-flex' style={{height:'120px'}}>
            <div className="col-4" style={{padding:'0 5px 0 0'}}>
                    <Link to={`/product/${item.product.id}`}>
                        <div   
                            className={classes.image2} 
                            style={{ backgroundImage: `url(${item.product.base_image.original_image_url})`, }}
                        />
                    </Link>
            </div>
            <div className='col-8 ' style={{padding:0}}>
                <div className=''>
                    <p className="" style={{ fontWeight: 700, fontSize: '14px',}}> {item.product.name} </p>
                    <div className='d-flex'>
                        <div className='col-4'>
                            <div className="font-weight-bold">
                                
                                {item.formated_total}
                                {/* ${item.price * quantity} */}
                            </div>

                                <div className="d-flex ml-1">

                                    <Tooltip title={inWishList ? 'Remove From WishList' : "Add To Wishlist"} >
                                        <IconButton className={classes.btn} onClick={toWishList}>
                                            {
                                                inWishList ?
                                                    <FavoriteIcon className={clsx(classes.fIcon, { animate: inWishListPending })} />
                                                    :
                                                    <FavoriteBorderIcon className={clsx(classes.fIcon, { animate: inWishListPending })} />
                                            }

                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Item From Cart">
                                        <IconButton className={classes.btn} onClick={removeFromCart}>
                                            <DeleteIcon className={clsx(classes.fIcon, { animate: inCartPending })} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            
                        </div>
                            
                        <div className="col-8">
                                <Quantity quantity={quantity} setQuantity={setQuantity} />
                                <div className="text-right">
                                    <Button variant='outlined' size='small' color='primary' className={classes.updtBtn} onClick={() => updateCartItem(quantity)}>Update</Button>
                                </div>
                               
                        </div>

                    </div>
                    
                    {/* <div className='text-center' >
                        <div style={{fontSize:'14px',fontWeight:700}}>Sub Total : ${item.price * quantity}</div>
                    </div> */}
                </div>
            </div>


        </div>
    )
}

export function CartSummary({ cart, setCart, addditionalData = false }) {
    // const { addditionalData = false } = addditionalData
    const [grand_total, set_grand_total] = useState('$0')
    const [sub_total, set_sub_total] = useState('$0')
    const [discount, setDiscount] = useState('$0')
    const [coupon, setCoupon] = useState('')
    const history = useHistory()
    const toast = NotiToast();


    const applyCoupon = () => {
        axios.post(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/coupon?token=true`,
            {
                code: coupon
            },
            {
                withCredentials: true
            }
        ).then(response => {
            console.log(response)
            setCart(response.data.data)
            setCoupon('')
            toast(response.data.message, response.data.success ? 'success' : 'error')

        })
    }

    const handleCouponDelete = () => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/coupon?token=true`, { withCredentials: true })
            .then(response => {
                console.log(response)
                setCart(response.data.data)
                toast('Coupon Removed', response.data.success ? 'success' : 'error')
            })
    }
    const handleChekout = () => {
        history.push('/checkout/billing_information')
    }

    useEffect(() => {
        if (Object.entries(cart).length > 0) {
            set_grand_total(cart.formated_grand_total)
            set_sub_total(cart.formated_sub_total)
            setDiscount(cart.formated_discount)
        } else {
            set_grand_total('$0')
            set_sub_total('$0')
            setDiscount('$0')
        }
    }, [cart])

    const classes = useStyles();
    return (
        <div className="" style={{ padding: '30px' }}>
            <div className="">
                <h5>Cart Summary</h5>
            </div>
            <div className="" >
                <div className="d-flex justify-content-between " style={{ margin: '5px 0' }}>
                    <div className='text-secondary'>Sub Total</div>
                    <div className="font-weight-bold" style={{ fontSize: "16px" }}>
                        {sub_total}
                    </div>
                </div>

                <div className="d-flex justify-content-between " style={{ margin: '5px 0' }}>
                    <div className='text-secondary'>Discount</div>
                    <div className="font-weight-bold" style={{ fontSize: "16px" }}>
                        {discount}
                    </div>
                </div>




                {
                    addditionalData &&
                    <>
                        <div className="">
                            <div className="form-group d-flex">
                                <input
                                    type="text"
                                    className={`form-control ${classes.couponBox}`}
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    placeholder="Coupon"
                                />
                                <Button 
                                    color='primary' 
                                    style={{ borderRadius: 0, marginLeft: '5px' }} 
                                    variant="contained" 
                                    onClick={applyCoupon}
                                    disabled={Object.entries(cart).length == 0}
                                    >
                                        Apply
                                </Button>
                            </div>

                        </div>

                        {
                            cart.coupon_code != null ?

                                <div className="text-center mt-1">
                                    <Chip

                                        label={`Applied Coupon ${cart.coupon_code}`}
                                        color="primary"
                                        onDelete={handleCouponDelete}
                                        deleteIcon={<CancelIcon />}
                                    />
                                </div>
                                :
                                ''
                        }

                    </>

                }

                <Divider style={{ margin: '10px 0' }} />

                <div className="d-flex justify-content-between">
                    <div className='font-weight-bold' >Grand Total</div>
                    <div className="font-weight-bold" style={{ fontSize: "16px" }}>

                        {grand_total}
                    </div>
                </div>

                {
                    addditionalData &&

                    <Button
                        variant='contained'
                        disableFocusRipple={true}
                        className={classes.checkoutBtn}
                        onClick={handleChekout}
                        disabled={Object.entries(cart).length == 0}
                    >
                        Proceed To Checkout
                    </Button>
                }

            </div>
        </div>
    )
}
