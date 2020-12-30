import React,{useEffect} from 'react'
import { Paper, Grid,Button, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import RedditIcon from '@material-ui/icons/Reddit';
import useLoadingBar from '../Common/useLoadingBar';

const useStyles = makeStyles(theme => ({

    text: {
        margin: 0,
        fontWeight: 700,
        color: 'white',
        fontSize: '18px !important',
        marginTop:'7px'
        // '&:hover':{
        //     color:'#FF6108'
        // }

    },
    paperRoot: {
        background: '#FF6108',
        marginTop: '2rem',
        padding: '30px',
        ['@media (max-width:480px)']: { 
            padding:'10px',
        }
    },
    icon: {
        padding: '5px',
        cursor: 'pointer',
        background: 'rgba(0,0,0,.2)',
        margin: '3px',
        '&:hover': {
            background: 'rgba(0,0,0,.4)'
        }
    },
    input:{
        padding:'5px 10px',
        width:'300px',
        ['@media (max-width:480px)']: { 
            width:'212px',
        }
    },
    btn:{
        background:'black',
        color:'wheat',
        borderRadius:0,
        marginBottom:'2px',
        height:'38px',
        '&:hover': {
            background: 'rgba(0,0,0,.9)'
        },
        ['@media (max-width:480px)']: { 
            padding:'6px 6px',
        }
    },
    bgImage: {
        height: '75px',
        width: '127px'
    },
    form:{
        ['@media (max-width:480px)'] : {
            padding:'0 10px 5px !important',
        }
    },
    payments:{
        display:'flex',
        justifyContent:'center',
        padding:'20px',
        ['@media (max-width:480px)'] : {
            padding:0,
        }
    }
}))

export default function NewsLetter({addLoadingBar}) {

    const classes = useStyles();
    useEffect(() => {
        addLoadingBar(10)
    }, [])


    return (
        <>
        <Paper elevation={0} square variant='outlined' className={classes.paperRoot}>
            <Grid container spacing={3} justify='space-around'>

                <Grid item md={6}>
                    <div className="d-flex" style={{ color: 'white' }}>
                        <Hidden smDown>
                            <p className={classes.text}>FOLLOW US</p>
                        </Hidden>

                        <div className="d-flex ml-3">
                            <div className={classes.icon}>
                                <FacebookIcon />
                            </div>
                            <div className={classes.icon}>
                                <InstagramIcon />
                            </div>
                            <div className={classes.icon}>
                                <TwitterIcon />
                            </div>
                            <div className={classes.icon}>
                                <YouTubeIcon />
                            </div>
                            <div className={classes.icon}>
                                <RedditIcon />
                            </div>
                        </div>
                    </div>
                </Grid>

                <Grid item md={6} className={classes.form}>

                    <input type='text' placeholder='Email Address' className={classes.input}/>
                    <Button variant='container' className={classes.btn}> Subscribe </Button>
                    
                </Grid>

            </Grid>
        </Paper>
        <PaymentMethods />
        </>
    )
}

function PaymentMethods() {
    const classes = useStyles();

    return (
        <Grid container justify='space-around' style={{marginTop:'2rem'}}>


            <Grid item xs={6} md={3}>
                <div className={classes.payments} >
                    <div 
                        className={classes.bgImage} 
                        style={{ 
                            backgroundImage: `url(${require('../images/download.png')})`,
                            backgroundPosition:'-160px 86px'
                            }}
                        >
                    </div>
                </div>
            </Grid>
            <Grid item xs={6} md={3}>
                <div className={classes.payments}>
                <div 
                        className={classes.bgImage} 
                        style={{ 
                            backgroundImage: `url(${require('../images/download.png')})`,
                            backgroundPosition:'10px 1px'
                            }}
                        >
                    </div>
                </div>
            </Grid>
            <Grid item xs={6} md={3}>
                <div className={classes.payments}>
                <div 
                        className={classes.bgImage} 
                        style={{ 
                            backgroundImage: `url(${require('../images/download.png')})`,
                            backgroundPosition:'-18px 79px'
                            }}
                        >
                    </div>
                </div>
            </Grid>
            <Grid item xs={6} md={3}>
                <div className={classes.payments}>
                <div 
                        className={classes.bgImage} 
                        style={{ 
                            backgroundImage: `url(${require('../images/download.png')})`,
                            backgroundPosition:'427px -5px'
                            }}
                        >
                    </div>
                </div>
            </Grid>

        </Grid>
    )
}
