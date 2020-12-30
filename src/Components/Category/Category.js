import { Container, Grid, Hidden, Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import CategoryBody from './CategoryBody';
import CategorySidebar from './CategorySidebar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../Routes';
import useLoadingBar from '../Common/useLoadingBar'
import { useQueryState } from 'react-router-use-location-state'
import CategoryFilterDrawer from './CategoryFilterDrawer';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    separator: {
        fontSize: '25px'
    },
    container:{
        ['@media (max-width:480px)']: { 
            // padding:'0 !important'
        },
    }
}));

export default function Category(props) {
    const classes = useStyles();
    // const slug = props.match.params.slug;
    const pathname = props.location.pathname;
    let array = pathname.split('/');
    let pathnameArray = array.filter((item, index) => index > 1)
    const slug = pathnameArray.slice(-1).pop();

    const [addLoadingBar, loadingBarJsx] = useLoadingBar();

    const [pageQry, setPageQry] = useQueryState('page', '')

    const [categories, setCategories] = useState({})
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(true)

    const [open, setOpen] = useState(false)


    const { dispatchLoadingBarProgress } = useContext(AppContext);

    const toTitleCase = (phrase) => {
        return phrase
            .toLowerCase()
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('-');
    };

    useEffect(() => {

        setLoading(true)
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/categories/slug/${slug}`,
            {
                withCredentials: true
            }

        ).then(response => {
            setCategories(response.data.data)
            setId(response.data.data.id)
            setLoading(false)
            addLoadingBar(30)
        }).catch(error => {
            console.log(error)
            setLoading(false)
            addLoadingBar(30)
        })
    }, [slug])

    useEffect(() => {
        window.scrollTo(0, 0)
        addLoadingBar(20)
    }, []);


    useEffect(() => {
        if (!loading) {
            dispatchLoadingBarProgress({
                type: 'ADD',
                payload: 50
            })
        }
    }, [loading])


    return (
        <>
            {loadingBarJsx}
            {
                loading ?

                <div className='d-flex justify-content-center align-items-center' style={{minHeight:'400px'}}>

                    <CircularProgress
                        size={24}
                    />
                </div> 

                :
                <Container className={classes.container} >
                    {
                        !loading &&

                        <>
                            <Breadcrumbs aria-label="breadcrumb" separator="›" classes={{ separator: classes.separator }}>
                                <Link color="inherit" href="/">
                                    Home
                            </Link>
                                {

                                    pathnameArray.map((item, index) => (

                                        <Link
                                            color={index == pathnameArray.length - 1 ? 'textPrimary' : 'inherit'}
                                            href={`/category/${item}`}
                                        >
                                            {toTitleCase(item)}
                                        </Link>
                                    ))
                                }


                            </Breadcrumbs>



                            <Grid container spacing={3}>

                                <Hidden smDown>
                                    <Grid item md={2}>
                                        <CategorySidebar
                                            maxprice={parseInt(categories.maxprice)}
                                            attributes={categories.attributes}
                                            search={props.location.search}
                                            setPageQry={setPageQry}
                                            setOpen={setOpen}
                                        />
                                    </Grid>
                                </Hidden>
                                <Grid item xs={12} md={10}>
                                    <CategoryBody
                                        id={id}
                                        name={categories.name}
                                        loading={loading}
                                        search={props.location.search}
                                        addLoadingBar={addLoadingBar}
                                        setPageQry={setPageQry}
                                        setOpen={setOpen}
                                    />
                                </Grid>
                            </Grid>

                            <CategoryFilterDrawer
                                components={
                                    
                                    <CategorySidebar
                                        maxprice={parseInt(categories.maxprice)}
                                        attributes={categories.attributes}
                                        search={props.location.search}
                                        setPageQry={setPageQry}
                                        setOpen={setOpen}
                                    />
                                }
                                open={open}
                                setOpen={setOpen}
                            />


                        </>
                    }
                </Container>

            }
            
        </>
    )
}
