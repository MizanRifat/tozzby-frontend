import React from 'react';
import NotiToast from "./NotiToast";
import axios from 'axios';
import { CartContext } from '../../App';


export function AddtoCart(product_id) {

    const toast = NotiToast();
    
    const { cartItems, setCartItems } = useContext(CartContext);

    axios.post(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/add/${product_id}`, {
        "product_id": product_id,
        "quantity": 1,
        "is_configurable": false
    }, { withCredentials: true })
        .then(response => {
            console.log(response)
            setCartItems(response.data.data)
            toast('Item Added to Cart', 'success')
        })
}
