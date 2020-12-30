import React from 'react'
import { Grid, Paper, Button } from '@material-ui/core';
import SingleProduct from '../Sections/SingleProduct';
import { CategoryTitle } from '../Sections/ProductSection';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useLoadingBar from '../Common/useLoadingBar';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function JustForYou({ addLoadingBar }) {
    const [products, setProducts] = useState(Array.from(Array(20).keys()));
    const [loading, setLoading] = useState(true);

    const [next, setNext] = useState(null);
    const [nextLoading, setNextLoading] = useState(true);


    const loadMore = () => {
        setNextLoading(true)
        axios.get(next)
            .then(response => {
                setProducts([
                    ...products,
                    ...response.data.data
                ])
                setNext(response.data.links.next)
                setNextLoading(false)

            }).catch(error => {
                console.log(error)
                setNextLoading(false)

            })
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/products?limit=12`)
            .then(response => {
                setProducts(response.data.data)
                setNext(response.data.links.next)
                setLoading(false)
                addLoadingBar(20)

            }).catch(error => {
                console.log(error)
                setLoading(false)
                addLoadingBar(20)

            })
    }, [])



    return (
        <Paper variant='outlined' square style={{ position: 'relative', marginTop: '5rem',background:'unset' }}>
            <CategoryTitle title={'Just For You'} />
            <Grid container spacing={1}>
                {
                    products.map((product, index) => (
                        <Grid item xs={6} md={2} key={index}>
                            <SingleProduct product={product} loading={loading} />
                        </Grid>
                    ))
                }

            </Grid>

            {
                next != null &&

                <div className="d-flex justify-content-center" style={{  padding: '25px 0' }}>
                    <div style={{position: 'relative',display:'inline-block'}}>

                    <Button
                        variant='contained'
                        color='primary'
                        style={{ width: '200px', borderRadius: '0px' }}
                        onClick={loadMore}
                        disabled={nextLoading}
                    >
                        load more
                    </Button>
                    {
                        nextLoading &&

                        <CircularProgress
                            size={24}
                            style={{
                                position: 'absolute',
                                left: '89px',
                                top: '6px',
                            }}
                        />
                    }
                    </div>
                </div>
            }
        </Paper>
    )
}
