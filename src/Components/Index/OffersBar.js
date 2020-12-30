import React,{useEffect,useState} from 'react'
import { createMuiTheme, Grid, MuiThemeProvider, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import useLoadingBar from '../Common/useLoadingBar';



const breakpointValues = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  };
  const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });
const useStyles = makeStyles(theme => ({
    imgStyle: {
        
        width: '100%',
        transition: '.3s ease-in',
        '&:hover': {
            transform: 'scale(1.05)',
            cursor: 'pointer'
        },
        ['@media (max-width:960px)']: { 
            height : '200px'
        }
    },
    imgStyle2: {
        width: '100%',
        transition: '.3s ease-in',
        '&:hover': {
            transform: 'scale(1.05)',
            cursor: 'pointer'
        },
        ['@media (max-width:600px)']: { 
            height : '200px'
        }
    },
    paperRoot: {
        marginTop: '2rem',
        padding: '15px 0',
        backgroundColor:'unset'
    },
    imgContainer:{
        ['@media (max-width:480px)']: { 
            paddingBottom : '15px'
        }
        
    }
}))
export default function OffersBar({ banner,addLoadingBar }) {
    const classes = useStyles();


    const [offers, setoffers] = useState([
        {
            image:"bn.jpg"
        },
        {
            image:"bn1.jpg"
        },
        {
            image:"bn2.jpg"
        },
    ])
    const [offers2] = useState([
        {
            image:"b1.jpg"
        },
        {
            image:"b2.jpg"
        }
    ])
    useEffect(() => {
        addLoadingBar(10)
    }, [])
    return (
        <>
            {
                banner == 2 ?

                    // <Paper elevation={0} className={classes.paperRoot}>
                    //     <div className='row justify-content-around' >
                    //         <div className={`${classes.imgContainer} text-center col-sm-12 col-md-6`} >

                    //             <img src={require('../images/b1.jpg')} className={classes.imgStyle2} />

                    //         </div>
                    //         <div className={`${classes.imgContainer} text-center col-sm-12 col-md-6`} >

                    //             <img src={require('../images/b2.jpg')} className={classes.imgStyle2} />

                    //         </div>

                    //     </div>
                    // </Paper>
                    // <MuiThemeProvider theme={theme}>
                        <Paper elevation={0} className={classes.paperRoot}>
                            <Grid container spacing={3} >


                                {
                                    offers2.map((item,index)=>(
                                        <Grid item xs={12} md={6}>
                                            <div className={classes.itemContainer}>
                                                <img src={require(`../images/${item.image}`)} className={classes.imgStyle} />
                                            </div>
                                        </Grid>
                                    ))
                                }

                            </Grid>

                        </Paper>
                    // </MuiThemeProvider>
                    :
                    <Paper elevation={0} className={classes.paperRoot}>
                        <Grid container spacing={3} >


                            {
                                offers.map((item,index)=>(
                                    <Grid item xs={12} sm={4}>
                                        <div className={classes.itemContainer}>
                                            <img src={require(`../images/${item.image}`)} className={classes.imgStyle2} />
                                        </div>
                                    </Grid>
                                ))
                            }

                        </Grid>

                    </Paper>
            }

        </>
    )
}
