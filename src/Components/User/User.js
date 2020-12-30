import React, { useEffect, useContext } from 'react'
import { Container, Grid, Hidden } from '@material-ui/core';
import UserSidebar from './UserSidebar';
import UserBody from './UserBody';
import Profile from './Profile'
import { AppContext } from '../../Routes';
import AuthCheck from '../Common/AuthCheck';
import BackDrop from '../Common/BackDrop';
import { makeStyles } from '@material-ui/core/styles';
import BottomBar from './BottomBar';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    bottomBar:{
        height:'60px',
        width:'100%',
        background:'red',
        position:'fixed',
        bottom:0
    }
}))


export default function User() {

    const classes = useStyles();

    const [authenticated, userLoading] = AuthCheck();

    // useEffect(() => {
    //     if (Object.entries(user).length == 0) {
    //         setAuthOpen({ comp: 1, state: true })
    //     }

    // }, [user])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);



    return (
        <>
            {

                userLoading ?
                
                    <div className='d-flex justify-content-center align-items-center' style={{minHeight:'400px'}}>

                        <CircularProgress
                            size={24}
                        />
                    </div> 

                    :

                    !authenticated ?

                        <div className="text-center" >
                            <h5 style={{ marginTop: '100px' }}>You need to be logged in to view this page.</h5>
                        </div>
                        :

                        <Container>

                            <Grid container spacing={3}>
                                <Hidden smDown>
                                    <Grid item xs={3}>
                                        <UserSidebar />
                                    </Grid>
                                </Hidden>

                                <Grid item xs={12} md={9}>
                                    <UserBody />
                                </Grid>
                            </Grid>

                        </Container>
            }
            <Hidden mdUp>
                <BottomBar />
            </Hidden>
        </>
    )
}
