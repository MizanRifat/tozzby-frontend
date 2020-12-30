import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import ViewListIcon from '@material-ui/icons/ViewList';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link, ButtonBase } from '@material-ui/core';
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    bottomBar:{
        height:'50px',
        // padding:'5px 0',
        width:'100%',
        background:'#3f51b5',
        position:'fixed',
        bottom:0,
        color:'white',
        zIndex:10,
    },
    section:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding:'5px 10px'
    },
    active:{
        background:'rgba(0,0,0,0.08)'
    }
}))


export default function BottomBar() {
    const classes = useStyles();
    const history = useHistory();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [slug, setSlug] = useState('');

    const handleClick = (event, index) => {
        setSelectedIndex(index);
        history.push(`/account/${lists[index].url}`)

    };

    const [lists, setLists] = useState([
        {
            name: 'Profile',
            slug: '/account/profile',
            icon: <PersonIcon />,
            url: 'profile'
        },
        {
            name: 'Orders',
            slug: '/account/orders',
            icon: <ViewListIcon />,
            url: 'orders'
        },
        {
            name: 'WishList',
            slug: '/account/wishlist',
            icon: <FavoriteBorderIcon />,
            url: 'wishlist'
        },
        {
            name: 'Reviews',
            slug: '/account/reviews',
            icon: <StarBorderIcon />,
            url: 'reviews'
        },
        // {
        //     name: 'Address',
        //     slug: '/account/address',
        //     icon: <LocationOnIcon />,
        //     url: 'address'
        // },

    ])

    useEffect(()=>{
        setSlug(window.location.pathname)
    },[window.location.pathname])

    return (
        <div className={classes.bottomBar}>
            <div className='d-flex justify-content-around'>
                {
                    lists.map((list,index)=>(
                        <ButtonBase onClick={(e)=>handleClick(e,index)} className={slug==list.slug && classes.active}>
                            <div className={classes.section} key={index}>
                                {list.icon}
                                <small>{list.name}</small>
                            </div>
                        </ButtonBase>
                    ))
                }
                
            </div>

        </div>
    )
}
