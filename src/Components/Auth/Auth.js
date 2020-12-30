import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../Routes';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        width: '600px',
        ['@media (max-width:480px)']: { 
            margin:'10px',
        },
    },
    formDisable: {
        pointerEvents: 'none',
        opacity: '0.5',
        background: 'rgba(255, 255, 255, 0.6)'
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Auth() {
    const classes = useStyles();
    const { authOpen, setAuthOpen, user, setUser } = useContext(AppContext);

    const [isSuccess, setIsSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setAuthOpen({...authOpen,state:true});
    };

    const handleClose = () => {
        setIsSuccess(false)
        setAuthOpen({...authOpen,state:false});
    };


    // ---------------------
    const [formData, setFormData] = useState({ errors: [] });

    const handleFieldChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const hasError = (field) => {

        return !!formData.errors[field]

    }

    const renderError = (field) => (

        formData.errors.hasOwnProperty(field) ? formData.errors[field][0] : ''

    )
    // const renderError = (field) => (

    //     formData.errors.hasOwnProperty(field) ? <small style={{ color: 'red' }}>{formData.errors[field][0]}</small> : ''

    // )
    // ---------------------

    return (
        <div>
            <Dialog
                open={authOpen.state}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {authOpen.comp == 1 ? authOpen.title : authOpen.title}
                </DialogTitle>
                <Divider />
                <DialogContent >


                    {
                        isSuccess ?

                            <div className="text-center">
                                Logged in successfully...
                            </div>

                            :

                            authOpen.comp == 1 ?

                                <LoginForm
                                    setUser={setUser}
                                    isSuccess={isSuccess}
                                    setIsSuccess={setIsSuccess}
                                    loading={loading}
                                    setLoading={setLoading}
                                    formData={formData}
                                    setFormData={setFormData}
                                    renderError={renderError}
                                    hasError={hasError}
                                    handleFieldChange={handleFieldChange}
                                    authOpen={authOpen} 
                                    setAuthOpen={setAuthOpen}
                                />
                                :
                                <RegistrationForm
                                    setUser={setUser}
                                    isSuccess={isSuccess}
                                    setIsSuccess={setIsSuccess}
                                    loading={loading}
                                    setLoading={setLoading}
                                    formData={formData}
                                    setFormData={setFormData}
                                    renderError={renderError}
                                    hasError={hasError}
                                    handleFieldChange={handleFieldChange}
                                    authOpen={authOpen} 
                                    setAuthOpen={setAuthOpen}
                                />


                    }
                </DialogContent>

                <DialogActions style={{borderTop:'1px solid rgba(0,0,0,.1)'}}>

                    <Button onClick={handleClose} variant='contained' color="secondary">
                        Close
                    </Button>

                </DialogActions>

            </Dialog>
        </div>
    );
}
