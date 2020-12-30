import React, { createContext, useState, useEffect } from 'react';
import Hero from './Hero/Hero';
import CategoryBars from '../Bars/CategoryBars'
import { Container, Grid, Hidden } from '@material-ui/core';
import Body from './Body';
import Sidebar from '../Sidebars/Sidebar';
import axios from 'axios';

export const MainContext = createContext();


export default function Index() {


    return (


            <Container className='lsdfksdflsdf'>
               
                    <Grid container spacing={3}>
                        {/* <Hidden smDown>
                            <Grid item md={2}>
                                <Sidebar />
                            </Grid>
                        </Hidden> */}
                        <Grid item xs={12}>
                            <Body />
                        </Grid>
                    </Grid>
                

            </Container>
    )
}
