import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core';
import { AppContext } from '../../Routes';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Button, Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
     
    root: {
        position: 'fixed',
        right: '10px',
        top: '100px',
        width: '400px',
        zIndex: 1200,
        padding: '15px',
        transition:'.3s ease',
    },
    show:{
        top:'50px',
        opacity:1
    },
    hide:{
        opacity:0,
        pointerEvents: 'none'
    },

    image: {
        width: '100%'
    },
    sf: {
        fontSize: '14px'
    },
    bf: {
        fontWeight: 700,
        fontSize: '16px'
    },
    btn: {
        '&:focus': {
            outline: 'none',
        }
    },
    checkoutBtn: {
        background: '#26A37C',
        color: 'white',
        '&:hover': {
            background: '#247959',
            color: 'white',
        }
    },
    viewCartBtn: {
        background: '#FF5420',
        color: 'white',
        '&:hover': {
            background: '#CC4A00',
            color: 'white',
        }
    }

}))

export default function MiniCart({showCart,setShowCart}) {
    const classes = useStyles();

    const { cartItems, setCartItems } = useContext(AppContext);

    return (
        <Paper elevation={4} className={`${classes.root} ${showCart ? classes.show : classes.hide }`} onMouseEnter={()=>setShowCart(true)} onMouseLeave={()=>setShowCart(false)}>
            <p>There are {cartItems.items_count} item(s) in your cart</p>
            <hr />
            {
                Object.entries(cartItems).length > 0 ?
                    cartItems.items.map((item, index) => (
                        <SingleItem key={index} item={item} setCartItems={setCartItems} />
                    )) :
                    <div className="text-center">
                        <p className={classes.bf}>Cart Is Empty</p>
                    </div>
            }
            <hr />

            <div className="d-flex justify-content-between" style={{ padding: '0 20px' }}>
                <div className={classes.bf}>SubTotal</div>
                <div className={classes.bf}>{cartItems.hasOwnProperty('formated_sub_total') ? cartItems.formated_sub_total : 0}</div>
            </div>

            <hr />
            <div className="d-flex justify-content-between" style={{ padding: '5px 20px' }}>

                <Link to='/cart' className={`btn ${classes.viewCartBtn} ${classes.btn}`}>View Cart</Link>
                <Link to='/checkout/billing_information' className={`btn ${classes.checkoutBtn} ${classes.btn}`}>CheckOut</Link>
            </div>
        </Paper>
    )
}

function SingleItem({ item, setCartItems }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const deleteItem = (id) => {
        console.log(id)
        setLoading(true)
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/remove-item/${id}?token=true`, {
            withCredentials: true
        }).then(response => {
            console.log(response)
            if (response.data.data == null) {
                setCartItems({})

            } else {
                setCartItems(response.data.data)
            }
            setLoading(false)

        })

    }
    return (
        <div className="d-flex mb-2">
            <div className="col-3">
                <img src={item.product.base_image[0].small_image_url} className={classes.image} />
            </div>
            <div className="col-7 p-0">
                <div className={classes.sf}>{item.name}</div>
                <div className={classes.sf}>{item.quantity}</div>
                <div className={classes.bf}>{item.formated_total}</div>
            </div>
            <div className="col-2 ">
                {
                    loading ? <CircularProgress size={20} style={{ marginTop: '16px', marginLeft: '13px' }} /> :


                        <Tooltip title="Remove From Cart">
                            <IconButton className={classes.btn} onClick={() => deleteItem(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                }
            </div>
        </div>
    )
}
