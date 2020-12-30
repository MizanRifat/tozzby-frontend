import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';



const useStyles = makeStyles((theme) => ({
    root: {
        background:'#2E2E54',
        minHeight:'300px',
        marginTop:'2rem',
        padding:'50px 100px',
        fontSize:'14px',
        color:'white',
        ['@media (max-width:480px)']: { 
            padding:'50px 20px',
        },
    },
    link:{
        display:'block',
        color:'white',
        marginBottom:'5px',
        '&:hover':{
            color:'white',
        }
    },
    linkContainer:{
        textAlign:'center',
        ['@media (max-width:480px)']: { 
            textAlign:'left',
        },
    }

}));

export default function Footer() {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <div className='row'>
                <div className='col-sm-12 col-md-6'>

                    <div className="d-flex" style={{marginBottom:'5px'}}>
                        <ShoppingCartOutlinedIcon style={{marginRight:'7px',marginTop:'7px',fontSize:'30px'}}/>
                        <p style={{ fontFamily: `Sriracha, cursive`,fontSize:'30px',margin:0 }}>
                            {
                                process.env.REACT_APP_NAME.toUpperCase()
                            }   
                        </p>
                    </div>
                    
                    <div>
                        We love to craft softwares and solve the real world problems with the binaries. We are highly committed to our goals. We invest our resources to create world class easy to use softwares and applications for the enterprise business with the top notch, on the edge technology expertise.
                    </div>
                   
                </div>
                <div className='d-flex col-sm-12 col-md-6'>
                    <div className={`col-6 ${classes.linkContainer}`} style={{paddingTop:'20px'}}>
                        <Link to='#' className={classes.link}>About Us</Link>
                        <Link to='#' className={classes.link}>Customer Service</Link>
                        <Link to='#' className={classes.link}>Contact Us</Link>
                        <Link to='#' className={classes.link}>Order and Returns</Link>
                    
                    </div>
                    <div className={`col-6 ${classes.linkContainer}`} style={{paddingTop:'20px'}}>
                        <Link to='#' className={classes.link}>Payment Policy</Link>
                        <Link to='#' className={classes.link}>Shipping Policy</Link>
                        <Link to='#' className={classes.link}>Privacy Policy</Link>
                        <Link to='#' className={classes.link}>Cookies Policy</Link>
                    </div>
                </div>


            </div>
            
        </div>
    )
}
