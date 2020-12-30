import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button,TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    inputGroupText: {
        background: '#c0392b !important',
        color: 'white!important',
        border: '0!important',
        borderRadius: '0.25rem 0 0 0.25rem!important'
    },
    formDisable: {
        pointerEvents: 'none',
        opacity: '0.5',
        background: 'rgba(255, 255, 255, 0.6)'

    },
    one:{
        marginTop:'5px'
    },
    two:{
        color:'#007bff',
        display:'inline-block',
        marginLeft:'5px',
        '&:hover':{
            textDecoration:'underline',
            cursor:'pointer'
        }
    },
    textfield:{
      
        margin:'12px 0'
    }
}))

export default function RegistrationForm({ setUser, loading, setLoading, isSuccess, setIsSuccess, formData, setFormData, hasError, renderError, handleFieldChange,authOpen,setAuthOpen}) {

    const classes = useStyles();

    const [fields, setFields] = useState([]);

    const initState = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: []
    };

    const toTitleCase = (phrase) => {
        return phrase
            .toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        setFormData(initState)
    }, [])

    useEffect(() => {
        const { errors, ...fields } = initState;

        const allFields = Object.keys(fields).map(item => (
            {
                type: item == 'password' || item == 'password_confirmation' ? 'password' : 'text',
                name: item,
                value: formData[item],
                placeholder: item == 'email' ? 'Enter Email' : toTitleCase(item)
            }
        ))
        setFields(allFields);
    }, [formData])



    const register = (e) => {

        e.preventDefault();
        setLoading(true)

        axios.post(`${process.env.REACT_APP_DOMAIN}/api/customer/register?token=true`, {
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            password: formData.password,
            password_confirmation: formData.password_confirmation
        }, {
            withCredentials: true
        })
            .then(response => {

                if (response.status === 200) {
                    console.log(response)
                    setLoading(false)
                    setIsSuccess(true)
                }
            })
            .catch(error => {
                console.log(error.response)

                if (error.response.status == 422) {

                    setFormData({
                        ...formData,
                        error: '',
                        errors: error.response.data.errors
                    })
                }
                if (error.response.status == 401) {

                    setFormData({
                        ...formData,
                        errors: [],
                        error: error.response.data.error
                    })
                }

                setLoading(false)


            })
    }



    return (
        <>


            <form className={loading && classes.formDisable} style={{ marginBottom: '40px' }} onSubmit={register}>

                {
                    fields.map((field, index) => (

                        <div className="" key={index}>

                            <TextField
                                className={classes.textfield}
                                type={field.type}
                                id={field.name}
                                placeholder={field.placeholder}
                                name={field.name}
                                onChange={handleFieldChange}
                                value={field.value}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    classes:{
                                        input:classes.textFieldInput
                                    }
                                }}
                                label={field.placeholder}
                                margin='dense'
                                error={hasError(field.name)}
                                helperText={ renderError(field.name)}
                            />

                        </div>

                    ))
                }


                <div className="mt-3">
                    <Button type='submit' variant='contained' color="primary" className='mr-2'>
                        Register
                    </Button>
                    {/* <div className="mr-2 mt-2">
                        OR
                    </div>
                    <Button variant='contained' color="primary" className='mr-2' onClick={()=>setAuthOpen({...authOpen,comp:1})}>
                        Login
                    </Button> */}
                    <p className={classes.one}>Already Have An Account? <span className={classes.two} onClick={()=>setAuthOpen({...authOpen,comp:1,title:'Login'})}>Login</span></p>
                </div>

                

            </form>
        </>
    )
}
