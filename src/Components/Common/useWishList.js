import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../Routes';
import axios from 'axios';
import NotiToast from '../Common/NotiToast';
import AuthCheck from './AuthCheck';

export default function useWishList() {

    const [product, setWishListProduct] = useState('');
    const [authenticated] = AuthCheck();
    const { wishListItems, setWishListItems, setAuthOpen } = useContext(AppContext);

    const [inWishList, setInWishList] = useState(false);
    const [inWishListPending, setInWishListPending] = useState(false);
    const toast = NotiToast();

    const ueHandle = (error) => {
        if (error.response.status == 401) {
            setAuthOpen({
                state: true,
                comp: 1,
                title:'Please Login First'
            })
        }
    }

    const toWishList = () => {
        if (!authenticated) {
            setAuthOpen({
                state: true,
                comp: 1,
                title:'Please Login First'
            })
        } else {
            setInWishListPending(true)
            axios.get(`${process.env.REACT_APP_DOMAIN}/api/wishlist/add/${product.id}?token=true`,
                { withCredentials: true }
            )
                .then(response => {
                    if (response.data.data != null) {
                        setWishListItems([...wishListItems, response.data.data])
                    } else {
                        setWishListItems(wishListItems.filter(item => item.product.id != product.id))
                    }

                    setInWishListPending(false)
                    setInWishList(!inWishList)
                    toast(response.data.message, 'success')
                }).catch(error => {
                    setInWishListPending(false)
                   
                })
        }
    }

    useEffect(() => {
        // console.log(typeof product == 'object')
        if (Object.entries(wishListItems).length > 0 && typeof product == 'object') {
            if (wishListItems.some(item => item.product.id == product.id)) {

                setInWishList(true)
            } else {
                setInWishList(false)
            }
        }

    }, [wishListItems, product])


    return [inWishList, inWishListPending, toWishList, setWishListProduct];
}
