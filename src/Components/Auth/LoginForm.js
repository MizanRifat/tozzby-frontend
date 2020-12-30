import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';
import { Button,TextField } from '@material-ui/core';
import axios from 'axios';


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
    link:{
        color:'#007bff',
        display:'inline-block',
        marginLeft:'5px',
        '&:hover':{
            textDecoration:'underline',
            cursor:'pointer'
        }
    },
    textFieldInput:{
        // padding:'10px 14px'
    },
    textfield:{
      
        margin:'12px 0'
    }
}))

export default function LoginForm({ setUser, loading, setLoading, isSuccess, setIsSuccess, formData, setFormData, hasError, renderError, handleFieldChange, authOpen, setAuthOpen }) {

    const classes = useStyles();

    const [fields, setFields] = useState([]);


    const initState = {
        email: '',
        password: '',
        remember:false,
        errors: []
    }

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


    const login = (e) => {

        e.preventDefault();
        setLoading(true)

        axios.post(`${process.env.REACT_APP_DOMAIN}/api/customer/login?token=true`, {
            email: formData.email,
            password: formData.password,
            remember: formData.remember ? "on" : "",
        }, {
            withCredentials: true
        })
            .then(response => {

                if (response.status === 200) {
                    console.log(response)
                    setLoading(false)
                    setUser(response.data.data)
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
            {
                formData.hasOwnProperty('error') &&

                <div className='mb-2 d-flex justify-content-center'>
                    <strong className='text-danger'>{formData.error}</strong>
                </div>
            }


            <form className={loading && classes.formDisable} style={{ marginBottom: '0px' }} onSubmit={login}>

                {
                    fields.filter((item,index)=> index < 2).map((field, index) => (

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

                <div className="form-check" style={{marginTop:'1rem'}}>
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="exampleCheck1"
                        onChange={e =>
                            setFormData({
                                ...formData,
                                remember: e.target.checked,
                              })
                          } 
                        />
                    <label className="form-check-label" for="exampleCheck1">Remember me</label>
                </div>




                <Button type='submit' variant='contained' color="primary" className='mr-2 my-2'>
                    Login
                </Button>

                <a href="">Forgot Password</a>

                <div className="">
                    <p style={{display:'inline-block'}}>Don't have an account?</p>
                    <p className={classes.link} onClick={() => setAuthOpen({ ...authOpen, comp: 2,title:'Register' })}>Register</p>
                 
                </div>

            </form>


        </>
    )
}


