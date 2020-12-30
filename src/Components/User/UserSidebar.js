import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import PersonIcon from '@material-ui/icons/Person';
import ViewListIcon from '@material-ui/icons/ViewList';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        height:'100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function UserSidebar() {
    const classes = useStyles();
    const history = useHistory();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [slug, setSlug] = useState('');
    
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
        console.log(window.location.pathname)
    },[window.location.pathname])

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        history.push(`/account/${lists[index].url}`)

    };

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders" style={{height:'100vh'}}>

                {
                    lists.map((item, index) => (
                        <ListItem
                            key={index}
                            button
                            selected={slug === item.slug}
                            onClick={(event) => handleListItemClick(event, index)}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))
                }
            </List>


        </div>
    );
}
