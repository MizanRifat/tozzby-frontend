import React, { useState, useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Button } from '@material-ui/core';
import axios from 'axios';
import NotiToast from '../Common/NotiToast';


const useStyles = makeStyles((theme) => ({
    buttonProgress: {
        position: 'absolute',
        right: '23px',
        top: '6px',
    },
    formDisable: {
        pointerEvents: 'none',
        opacity: '0.5',
        background: 'rgba(255, 255, 255, 0.6)'
    },
    formGroup:{
        ['@media (max-width:480px)']: { 
            padding:0,
        }
    },
    pcBtn:{
        marginLeft:'15px',
        ['@media (max-width:480px)']: { 
            marginLeft:0,
        }
    }

}))


export default function ProfileEdit({ user, setUser }) {
    const classes = useStyles();
    const toast = NotiToast();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        gender: 'male',
        password: '',
        password_confirmation: '',


    })
    const [loading, setLoading] = useState(false)
    const [changePass, setChangePass] = useState(false)
    const handleFieldChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = () => {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_DOMAIN}/api/customer/profile?token=true`,
            {
                ...formData
            },
            {
                withCredentials: true
            }
        ).then(response => {
            // console.log(response)
            setUser(response.data.data)
            toast('Profile Updated', 'success')
            setLoading(false)
        }).catch(error => {
            setLoading(false)
        })
    }

    const toTitleCase = (phrase) => {
        return phrase
            .toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };


    useEffect(() => {
        if (Object.entries(user).length > 0) {
            setFormData({
                ...formData,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                date_of_birth: user.date_of_birth,
                gender: user.gender == null ? 'male' : user.gender

            })
        }
    }, [user])
    return (
        <div>
            <form className={loading && classes.formDisable}>

                {
                    Object.keys(formData).filter(item=> item != 'password' && item != 'password_confirmation').map((item, index) => (


                        <div className={`${classes.formGroup} form-group col-xs-12 col-md-8`} key={index}>
                            {


                                item == 'gender' ?


                                    <>
                                        <label htmlFor="gender" className={classes.required}>Gender</label>
                                        <select name="gender" id="gender" className='form-control' value={formData.gender} onChange={handleFieldChange}>
                                            <option value="none">None</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </>
                                    :
                                    <>
                                        <label htmlFor={item}>{toTitleCase(item)}</label>
                                        <input
                                            type={item == 'password' || item == 'password_confirmation' ? 'password' : 'text'}
                                            className="form-control"
                                            id={item}
                                            name={item}
                                            placeholder={item == 'date_of_birth' ? 'yyyy-mm-dd' : toTitleCase(item)}
                                            value={formData[item]}
                                            onChange={handleFieldChange}
                                        />
                                    </>
                            }
                        </div>

                    ))


                }

                {
                    changePass ?

                    <>
                        <div className={`${classes.formGroup} form-group col-xs-12 col-md-8`}>
                            <label htmlFor="password" className={classes.required}>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleFieldChange}
                            />
                        </div>

                        <div className={`${classes.formGroup} form-group col-xs-12 col-md-8`}>
                            <label htmlFor="password_confirmation" className={classes.required}>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password_confirmation"
                                placeholder="Confirm Password"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleFieldChange}
                            />
                        </div>
                    </>
                    :
                    <Button variant='contained' color='primary' onClick={()=>setChangePass(true)} className={classes.pcBtn}>Change PassWord</Button>
                }


                <div className="text-right mt-3" style={{ position: 'relative' }}>
                    <Button
                        variant='contained'
                        onClick={handleSubmit}
                        color='primary'
                        disabled={loading}
                    >
                        Save
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>

            </form>
        </div>
    )
}
