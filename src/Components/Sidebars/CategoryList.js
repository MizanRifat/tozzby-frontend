import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Paper, List, ListItem, ListItemIcon, ListItemText, Link } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Skeleton from '@material-ui/lab/Skeleton';
import { AppContext } from '../../Routes';
import { useHistory } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        // maxWidth: 360,
        width: 198,
        // backgroundColor: 'red',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        padding: 0,
        paddingLeft: theme.spacing(4),

    },
    listItem: {
        padding: 0,
        paddingLeft: theme.spacing(2),
        color: '#666666',
        transition: '.3s ease-in',
        justifyContent: 'space-between',
        position: 'relative',
    },
    innerItem: {
        flex: 1,
        display: 'flex',
        transition: '.3s ease-in',
        '&:hover': {
            transform: 'translateX(10px)',
            color: '#FE5220'
        },
    },
    listItemIcon: {
        minWidth: 'unset',
        marginRight: '10px'
    },
    primary: {
        fontSize: '14px',
        fontWeight: 700,

    },
    abs: {
        background: '#f4f4f4',
        height: '200px',
        width: '200px',
        position: 'absolute',
        right: '-200px',
        zIndex: 30,
        top: '30px',
        // transform: 'translateX(20px)',
        transition: '.2s ease-in',
        padding: '10px',
        borderRadius: 0,
    },
    show: {
        top: 0,
        opacity: 1
    },
    hide: {
        opacity: 0,
        pointerEvents: 'none'
    },
    link:{
        color:'unset',
        width:'100%',
        '&:hover':{
            textDecoration:'none'
        }
    }
}));

export default function CategoryList() {
    const classes = useStyles();
    const { categories } = useContext(AppContext);




    return (
        <>
            {
                categories.loading ?
                    <div classsName='text-center' style={{ width: '198px' }}>
                        {
                            Array.from(Array(10).keys()).map((item, index) => (
                                <Skeleton animation='wave' width='170px' height='30px' key={index} style={{ marginLeft: '15px' }} />
                            ))
                        }

                    </div>

                    :

                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.root}
                    >

                        {
                            categories.state.map((category, index) => (
                                <SingleListItem item={category} key={index} href={`${category.slug}`} />
                            ))
                        }

                    </List>
            }
        </>
    );
}

function SingleListItem({ item, href }) {
    const [show, setShow] = React.useState(false);
    const classes = useStyles();
    const history = useHistory();

    const handleClick = () => {
        history.push(`/category/${href}`)
    };

    useEffect(() => {
        // console.log({ href })
    }, [])
    return (
        <>
            <ListItem button className={classes.listItem} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} >
                <Link href={`/category/${href}`} className={classes.link}>
                    <div style={{ width: '100%', display: 'flex' }}>

                        <div className={classes.innerItem} >
                            <ListItemIcon className={classes.listItemIcon}>
                                <InboxIcon />
                            </ListItemIcon>

                            <ListItemText primary={item.name} classes={{ primary: classes.primary }} />
                        </div>

                        {

                            item.children.length > 0 && <ChevronRightIcon fontSize='small' style={{ marginTop: '5px' }} />

                        }
                    </div>
                </Link>


                {
                    item.children.length > 0 ?

                        <Paper elevation={3} className={`${classes.abs} ${show ? classes.show : classes.hide}`} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>

                            {
                                item.children.map((category, index) => (
                                    <SingleListItem item={category} key={index} href={`${href}/${category.slug}`} />
                                ))
                            }
                        </Paper>
                        : ''
                }


            </ListItem>


        </>
    )
}


