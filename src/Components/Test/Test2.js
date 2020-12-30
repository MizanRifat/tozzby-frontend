import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
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

export default function SimpleBackdrop() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (

        <div className={classes.backdrop} >
            <CircularProgress color="inherit" />
        </div>

    );
}
