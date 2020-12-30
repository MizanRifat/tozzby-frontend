import React, { useState, useEffect, useContext,useRef } from 'react';
import { AppContext } from '../../Routes';
import axios from 'axios';
import NotiToast from './NotiToast';
import AuthCheck from './AuthCheck';

export default function useCartItem() {

    const [product, setCartItemProduct] = useState('');

    const { cartItems, setCartItems, setAuthOpen } = useContext(AppContext);

    const [authenticated] = AuthCheck();

    const [inCart, setInCart] = useState(false);
    const [inCartPending, setInCartPending] = useState(false);
    const toast = NotiToast();


    const ref=useRef(null)
    


    const ueHandle = () => {
        // if (error.response.status == 401) {
        //     setAuthOpen({
        //         state: true,
        //         comp: 1
        //     })
        // }
        if (!authenticated) {
            setAuthOpen({
                state: true,
                comp: 1
            })
        }



    }

    const addToCart = (quantity) => {
  
        if (!authenticated) {
            setAuthOpen({
                state: true,
                comp: 1,
                title:'Please Login First'
            })
        } else {
            setInCartPending(true)
            axios.post(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/add/${product.id}?token=true`, {
                "product_id": product.id,
                "quantity": quantity,
                "is_configurable": false
            }, { withCredentials: true })
                .then(response => {
                    setCartItems(response.data.data)
                    setInCartPending(false)
                    setInCart(true)
                    toast('Item Added to Cart', 'success')
                })
                .catch(error => {
                    setInCartPending(false)
                    
                })
        }
    }


    const removeFromCart = (e) => {
        
        
        if (!authenticated) {
            setAuthOpen({
                state: true,
                comp: 1,
                title:'Please Login First'
            })
        } else {
            setInCartPending(true)
            const cartitem = cartItems.items.find(item => item.product.id == product.id)
            axios.get(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/remove-item/${cartitem.id}?token=true`, {
                withCredentials: true
            }).then(response => {
                console.log(response)
                setInCartPending(false)
                if (response.data.data == null) {
                    setCartItems({})
                } else {
                    setCartItems(response.data.data)
                }

                toast('Item removed', 'success')
            })
                .catch(error => {
                    setInCartPending(false)
                   
                })
        }
    }



    const updateCartItem = (quantity) => {
        if (!authenticated) {
            setAuthOpen({
                state: true,
                comp: 1,
                title:'Please Login First'
            })
        } else {
            const cartitem = cartItems.items.find(item => item.product.id == product.id)
            axios.post(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/update?token=true`,
                {
                    qty: { [cartitem.id]: quantity }
                },
                { withCredentials: true }
            )
                .then(response => {
                    if (response.data.data == null) {
                        setCartItems({})
                    } else {
                        setCartItems(response.data.data)
                        console.log('ask', response.data.data)
                    }
                    toast('Cart Updated', 'success')
                })
                .catch(error => {
                    
                })
        }
    }

    useEffect(() => {

        if (Object.entries(cartItems).length > 0 && typeof product == 'object') {

            if (cartItems.items.some(item => item.product.id == product.id)) {

                setInCart(true)
            } else {
                setInCart(false)
            }
        } else {
            setInCart(false)
        }

    }, [cartItems, product])


    return { inCart, inCartPending, addToCart, removeFromCart, setCartItemProduct, updateCartItem,ref };
}
