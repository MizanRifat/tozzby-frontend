import React, { useRef, useEffect, useState, useContext } from 'react'
import { Grid,Button,Hidden } from '@material-ui/core'
import SingleProduct from '../Sections/SingleProduct';
import { spring } from "react-flip-toolkit";
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useQueryState } from 'react-router-use-location-state';
import { AppContext } from '../../Routes';
import Pagination from '@material-ui/lab/Pagination';
import CategoryFilterDrawer from './CategoryFilterDrawer'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    selectRoot: {
        padding: '5px !important',
        backgroundColor: 'unset',
        '&:focus': {
            backgroundColor: 'unset',
        }
    },
    formControl: {
        border: 0,
        borderRight: '1px solid rgba(0,0,0,.2)',
        padding: '3px 4px',
        height: 'unset'
    },
    item:{
        ['@media (max-width:480px)']: { 
            padding:'0 !important'
        },
    },
    filterBtn:{
        borderRadius:0,
        

    }
}));

export default function CategoryBody({ id, search, addLoadingBar,setPageQry,name,setOpen }) {
    const classes = useStyles();


    const { dispatchLoadingBarProgress } = useContext(AppContext);




    const [sortQry, setSortQry] = useQueryState('sort', '')
    const [orderQry, setOrderQry] = useQueryState('order', '')
    

    const query = new URLSearchParams(search);


    const containerRef = useRef();
    const [products, setProducts] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

    const [loading, setLoading] = useState(true)

    

    const [pagination, setPagination] = useState({
        page:1,
        totalPage: '',
        firstPage: ''
    })

    const [attribute, setattribute] = useState({
        sort: query.get('sort') ? query.get('sort') : 'created_at',
        order: 'desc',
    })

    const handleAttributeChange = (e) => {
        setPageQry('')
        setSortQry(e.target.value)
       
    }

    const handleOrderChange = () => {
        setPageQry('')
        setOrderQry(attribute.order == 'asc' ? 'desc' : 'asc')
        setattribute({
            ...attribute,
            order: attribute.order == 'asc' ? 'desc' : 'asc'
        })
    }


    const handlePagination = (e, page) => {
        setPageQry(page)

    }

    useEffect(() => {
        setLoading(true)
        let apiQuery = `${process.env.REACT_APP_DOMAIN}/api/products?category_id=${id}`

        if (query.get('sort') == null) {
            apiQuery += `&sort=created_at`
        }

        if (query.get('order') == null) {
            apiQuery += `&order=desc`
        }

        axios.get(`${apiQuery}${search.replace('?', '&')}`,
            {
                withCredentials: true
            }

        ).then(response => {
            setProducts(response.data.data)
            setPagination({
                ...pagination,
                totalPage: response.data.meta.last_page,
            })
            setLoading(false)
            addLoadingBar(50)
        }).catch(error => {
            console.log(error)
            setLoading(false)
            addLoadingBar(50)
        })
    }, [attribute, search])

    useEffect(() => {
        const squares = [...containerRef.current.querySelectorAll(".item")];
        squares.forEach((el, i) => {
            spring({
                config: "wobbly",
                values: {
                    translateY: [-15, 0],
                    // opacity: [0, 1]
                },
                onUpdate: ({ translateY, opacity }) => {
                    el.style.opacity = opacity;
                    el.style.transform = `translateY(${translateY}px)`;
                },
                delay: i * 250,
                onComplete: () => {
                    // add callback logic here if necessary
                }
            });
        });
    }, [products]);

    useEffect(() => {
        if (!loading) {
            dispatchLoadingBarProgress({
                type: 'ADD',
                payload: 10
            })
        }
    }, [loading])



    return (
        <>

            <h5 style={{marginTop:'3px'}}>{name}</h5>

            <div className="d-flex justify-content-between my-3 w-100">

                <Hidden mdUp>
                    <Button 
                        variant='contained' 
                        size='small' 
                        color='primary' 
                        className={classes.filterBtn}
                        onClick={()=>setOpen(true)}>
                            Filter
                    </Button>    
                </Hidden>
                
                <div></div>

                <div style={{ width: '150px' }}>
                    <div className="d-flex list-group-item" style={{ padding: 0 }}>
                        <div className="form-group col-10" style={{ marginBottom: '0px', padding: 0 }}>
                            <select id="inputState" className={`form-control ${classes.formControl}`} onChange={handleAttributeChange}>
                                <option value='created_at'>Date</option>
                                <option value='price'>Price</option>
                            </select>
                        </div>

                        <IconButton style={{ padding: 0 }} className='col-2' onClick={handleOrderChange}>

                            {
                                attribute.order == 'asc' ?

                                    <ArrowDownwardIcon />
                                    :
                                    <ArrowUpwardIcon />

                            }


                        </IconButton>
                    </div>

                </div>
            </div>

            <Grid container spacing={3} ref={containerRef}>

                {
                    products.length == 0 ?
                        <div className="d-flex justify-content-center" style={{ marginTop: '100px', width: '100%' }}>
                            <h5>No Product Found</h5>
                        </div>
                        :

                        products.map((item, index) => (

                            <Grid item xs={6} sm={3} className={classes.item}>
                                <SingleProduct product={item} key={index} loading={loading} />
                            </Grid>
                        ))
                }


            </Grid>

            <div className="d-flex justify-content-center mt-5" >
                <Pagination
                    count={pagination.totalPage}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePagination}
                />
            </div>

            
        </>
    )
}
