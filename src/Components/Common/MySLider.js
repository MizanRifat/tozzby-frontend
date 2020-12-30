import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

export default function MySLider(props) {

    const {slidesToShow = 5} = props;

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        // variableWidth: true,
        slidesToScroll: 4,
        // centerPadding: '10px',
        nextArrow: <NavigateNextIcon color='primary' />,
        prevArrow: <NavigateBeforeIcon color='primary' />,
        responsive: [

            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false
                }
            },

        ]
    };

    return (
        <>
            <Slider {...settings}>
               {props.children}
            </Slider>
        </>
    )
}
