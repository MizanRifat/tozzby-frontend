import React, { useState, useEffect } from 'react'
import { Paper, Grid, Hidden } from '@material-ui/core';
import SingleProduct from './SingleProduct';
import { makeStyles } from '@material-ui/core/styles';
import Countdown from 'react-countdown-now';

import MySLider from '../Common/MySLider';
import Axios from 'axios';

const useStyles = makeStyles({
    title: {

        display: 'flex',
        position: 'absolute',
        top: '-47px',
        // left:'25px'
    },
    titleText: {
        background: '#FF5C00',
        color: 'white',
        padding: '8px 10px',
        borderRadius: '5px 5px 0px 0px',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    flashText: {
        padding: '8px 10px',
        fontWeight: 'bold',
        fontSize: '20px',
        borderBottom: '2px solid #FF5C00'

    },
    countdown: {
        position: 'absolute',
        left: '150px',
        fontSize: '30px'
    },
    span: {
        background: '#FF5C00',
        padding: '0px 7px',
        color: 'white',
        borderRadius: '3px'
    },
    cBanner: {
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        cursor: 'pointer',
        objectFit:'contain'
    },
    bannerContainer: {
        height: '300px',
        // width: '260px',
        padding: '10px 0px 0px 10px ',
    },
    categoryContainer: {
        padding: '8px 25px !important'
        // ['@media (max-width:780px)']: {
        //     display: 'none'
        // }
    },
    productContainer: {
        padding: '0 30px',
        ['@media (max-width:480px)']: {
            padding: '0 5px'
        }

    },
    paperRoot: {
        position: 'relative',
        position: 'relative', 
        marginTop: '5rem',
        background:'unset'
    }

})

export default function ProductSection(props ) {

    const classes = useStyles();
    const { category } = props
    const { addLoadingBar } = props
    const { flashSale = false } = props
    const { newProduct = false } = props
    const { featured = false } = props

    const [products, setproducts] = useState(Array.from(Array(4).keys()))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let qs = `${process.env.REACT_APP_DOMAIN}/api/products?`

        if(newProduct){
            qs += `new=1`
        }else if(featured){
            qs += 'featured=1' 
        }else{
            qs += `category_id=${category.id}`
        }
        Axios.get(qs)
            .then(response => {
                setproducts(response.data.data)
                setLoading(false)
                addLoadingBar(20)
            })
            .catch(eeror=>{
                addLoadingBar(20)
            })


    }, [])

  console.log({category})

    return (
        <>
            {
                // loading ? '' :

                    <div style={{ marginTop: '5rem' }}>

                        {/* <Paper elevation={0} className={classes.paperRoot}> */}
                        <Paper variant='outlined' square className={classes.paperRoot}>
                            <CategoryTitle flashSale={flashSale} title={category.name} />
                            <Grid container spacing={2} >
                                {
                                    flashSale || newProduct || featured ?

                                        <Grid item xs={12} style={{ paddingLeft: 0 }}>
                                            <div className={classes.productContainer}>
                                                <MySLider>
                                                    {
                                                        products.map((item, index) => (
                                                            <SingleProduct product={item} key={index} loading={loading}/>
                                                        ))
                                                    }

                                                </MySLider>

                                            </div>
                                        </Grid>

                                        :
                                        <>
                                            <Hidden smDown>
                                                <Grid item sm={3} className={classes.categoryContainer}>

                                                    <div className={classes.bannerContainer}>
                                                        <img src={`${process.env.REACT_APP_DOMAIN}/images/${category.image}`} className={classes.cBanner} />
                                                    </div>

                                                </Grid>
                                            </Hidden>


                                            <Grid item xs={12} sm={12} md={9} style={{ paddingLeft: 0 }}>
                                                <div className={classes.productContainer}>

                                                    <MySLider>
                                                        {
                                                            products.map((item, index) => (
                                                                <SingleProduct product={item} key={index} loading={loading} />
                                                            ))
                                                        }
                                                    </MySLider>
                                                </div>
                                            </Grid>
                                        </>

                                }

                            </Grid>




                        </Paper>
                    </div>
            }
        </>
    )
}

export function CategoryTitle({ flashSale, title }) {
    const classes = useStyles();

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        // if (completed) {
        //     return 'completed';
        // } else {
        return <p><span className={classes.span}>{days}</span>:<span className={classes.span}>{hours}</span>:<span className={classes.span}>{minutes}</span>:<span className={classes.span}>{seconds}</span></p>
        // }


    };

    const ffff = ({ total, days, hours, minutes, seconds, milliseconds, completed }) => {
        return <p><span>{total}</span>:<span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>:<span>{milliseconds}</span></p>
    }
    const date = new Date('2020-04-30 07:35:00')
    const datMS = date.getTime();
    return (
        <div className={`${classes.title}`}>


            {
                flashSale ?
                    <>
                        <div className={classes.flashText}>FLASH SALE</div>

                        <div className={classes.countdown}>
                            <Countdown date={datMS} renderer={renderer} />
                        </div>
                    </>

                    :

                    <div className={classes.titleText}>{title}</div>

            }


        </div>
    )
}

