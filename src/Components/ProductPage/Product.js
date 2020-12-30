import React, { useState, useEffect, createContext } from 'react'
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductDetails from './ProductDetails';
import ProductImages from './ProductImages';
import Axios from 'axios';
import useLoadingBar from '../Common/useLoadingBar';
import ProductSpecification from './ProductSpecification';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ProductContext = createContext();


const useStyles = makeStyles(theme => ({
    container:{
        marginTop:'20px',
        ['@media (max-width:480px)']: { 
            // padding:'0 !important'
            marginTop:'10px',
        },
    }
}))

export default function Product(props) {

    const id = props.match.params.id;

    const [product, setproduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [addLoadingBar, loadingBarJsx] = useLoadingBar();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);


    useEffect(() => {
        addLoadingBar(20)
        Axios.get(`${process.env.REACT_APP_DOMAIN}/api/products/${id}`)
            .then(response => {
                setproduct(response.data.data)
                setLoading(false)
                addLoadingBar(80)
            })
        .catch(error=>{
            addLoadingBar(80)
        })
    }, [])


    const classes = useStyles();
    return (
        <>
            {loadingBarJsx}
            <Container className={classes.container}>
                <Grid container spacing={3}>

                    {
                            loading ?
            
                            <div className='d-flex justify-content-center align-items-center w-100' style={{minHeight:'400px'}}>
            
                                <CircularProgress
                                    size={24}
                                />
                            </div>

                            :

                            <ProductContext.Provider value={{ product }}>
                                <Grid item xs={12} md={6}>
                                    <ProductImages />
                                    <ProductSpecification id={id}/>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <ProductDetails />
                                </Grid>

                            </ProductContext.Provider>
                    }

                </Grid>
            </Container>
        </>
    )
}
