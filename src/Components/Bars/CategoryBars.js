import React, { useState,useEffect } from 'react';
import SingleCategoryBar from './SingleCategoryBar';
import { Grid, Container } from '@material-ui/core';
import useLoadingBar from '../Common/useLoadingBar';

export default function CategoryBars({addLoadingBar}) {


    const [category, setcategory] = useState([
        {
            name: 'Fashion',
            image: 'Album4.png'
        },
        {
            name: 'Electronics',
            image: 'Album4.png'
        },
        {
            name: 'Bags',
            image: 'Album4.png'
        },
        {
            name: 'Accessories',
            image: 'Album4.png'
        },
        {
            name: 'Health',
            image: 'Album4.png'
        },
        {
            name: 'Beauty',
            image: 'Album4.png'
        },
        {
            name: 'Accessories',
            image: 'Album4.png'
        },
        {
            name: 'Health',
            image: 'Album4.png'
        },
        {
            name: 'Beauty',
            image: 'Album4.png'
        },
        {
            name: 'Accessories',
            image: 'Album4.png'
        },
        {
            name: 'Health',
            image: 'Album4.png'
        },
        {
            name: 'Beauty',
            image: 'Album4.png'
        },
        {
            name: 'Furniture',
            image: 'Album4.png'
        }
    ])

    useEffect(() => {
        addLoadingBar(10)
    }, [])



    return (
        <div className='d-flex justify-content-between wrapper'>
            {
                category.map((item, index) => (
                    <SingleCategoryBar category={item} key={index} />
                ))

            }
        </div>

    )
}
