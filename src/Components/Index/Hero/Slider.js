import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    imgStyle: {
        height: '365px',
        ['@media (max-width:780px)'] : {
            height:'150px'
          }
    }
}))
export default function Slider() {
    const classes = useStyles();
    
    return (
        <div className="">
            <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} showStatus={false} dynamicHeight={true} autoPlay={true}>
                <div>
                    <img src={require('../../images/1.jpg')} className={classes.imgStyle} />
                </div>
                <div>
                    <img src={require('../../images/2.jpg')} className={classes.imgStyle}/>
                </div>
                <div>
                    <img src={require('../../images/3.jpg')}  className={classes.imgStyle}/>
                </div>
                <div>
                    <img src={require('../../images/4.jpg')}  className={classes.imgStyle}/>
                </div>
            </Carousel>
        </div>
    )
}
