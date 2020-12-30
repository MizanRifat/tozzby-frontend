import React, { useState,useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProductSection from '../Sections/ProductSection';
import SpecialProducts from '../Sections/SpecialProducts';
import axios from 'axios'
import { Link } from '@material-ui/core';
import useLoadingBar from '../Common/useLoadingBar';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabRoot: {
        fontWeight: 700,
        fontSize: '16px',
    },
    container:{
        display:'flex',
        justifyContent:'space-between',
        borderBottom:'1px solid rgba(0,0,0,.2)',
        // marginLeft:'30px',
    },
    panel:{
        "& .MuiBox-root": {
            padding: 0
          }
    }
}));

export default function IndexTabs({addLoadingBar}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [newProducts, setNewProducts] = useState(Array.from(Array(5).keys()))
    const [featuredProducts, setFeaturedProducts] = useState(Array.from(Array(5).keys()));
    const [loading, setLoading] = React.useState(true);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {

        let one = `${process.env.REACT_APP_DOMAIN}/api/products?new=1`
        let two = `${process.env.REACT_APP_DOMAIN}/api/products?featured=1`

        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);

        axios
            .all([requestOne, requestTwo])
            .then(
                axios.spread((...responses) => {
                    const responseOne = responses[0];
                    const responseTwo = responses[1];

                    setNewProducts(responseOne.data.data)
                    setFeaturedProducts(responseTwo.data.data)
                    setLoading(false)
                    // console.log({responseOne, responseTwo});

                    addLoadingBar(10)
                })
            )
            .catch(errors => {
                console.error(errors);
                setLoading(false)

                addLoadingBar(10)
            });

    }, [])



    return (
        <div className="mt-5">

            <div className={classes.container}>

                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
                    <Tab
                        className={classes.tabRoot}
                        label="Featured"
                        {...a11yProps(0)}
                    />

                    <Tab
                        label="New"
                        className={classes.tabRoot}
                        {...a11yProps(1)}
                    />



                </Tabs>

                <Link href="#" color="inherit" style={{marginTop:'14px',paddingRight:'15px'}}>
                    See All
                </Link>


            </div>


            <TabPanel value={value} index={0} className={classes.panel}>
                <SpecialProducts products={featuredProducts} loading={loading} style={{ padding: 0 }}/>
            </TabPanel>

            <TabPanel value={value} index={1} className={classes.panel}>
                <SpecialProducts products={newProducts} loading={loading} />
            </TabPanel>



        </div>
    );
}