import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px'
     
    },
}));

export default function BackDrop() {
    const classes = useStyles();

    return (

        <div className={classes.backdrop} >
            <CircularProgress color="inherit" />
        </div>

    );
}
