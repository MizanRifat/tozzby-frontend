import React, { useState, useEffect, useContext } from 'react'
import { Button, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CountryList from './CountryList';
import axios from 'axios'
import { AppContext } from '../../Routes';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({

    required: {
        '&:after': {
            content: "'*'",
            margin: '2px'
        }
    },
    buttonProgress:{
        position:'absolute',
        right:'23px',
        top:'6px',
    },
    formDisable: {
        pointerEvents: 'none',
        opacity: '0.5',
        background: 'rgba(255, 255, 255, 0.6)'
    }


}))


export default function AddressForm() {
    const history = useHistory();
    const { cartItems, setCartItems } = useContext(AppContext);
    const classes = useStyles();
    const [sformData, setsFormData] = useState({}); 

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        company_name: '',
        email: '',
        street_address: '',
        city: '',
        country: 'BD',
        state: '',
        postcode: '',
        phone: ''


    })

    const [loading,setLoading] = useState(false)
    


    useEffect(() => {
        if (cartItems.billing_address != null) {
            setFormData({
                ...formData,
                "first_name": cartItems.billing_address.first_name,
                "last_name": cartItems.billing_address.last_name,
                "email": cartItems.billing_address.email,
                "street_address": cartItems.billing_address.address1[0],
                "state": cartItems.billing_address.state,
                "city": cartItems.billing_address.city,
                "postcode": cartItems.billing_address.postcode,
                "phone": cartItems.billing_address.phone
            })
            setsFormData({
                ...formData,
                "first_name": cartItems.billing_address.first_name,
                "last_name": cartItems.billing_address.last_name,
                "email": cartItems.billing_address.email,
                "street_address": cartItems.billing_address.address1[0],
                "state": cartItems.billing_address.state,
                "city": cartItems.billing_address.city,
                "postcode": cartItems.billing_address.postcode,
                "phone": cartItems.billing_address.phone
            })
        }
    }, [cartItems])

    const handleFieldChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = () => {
        setLoading(true)
        if(JSON.stringify(formData) == JSON.stringify(sformData)){
            history.push('/checkout/payment_method')
        }
        axios.post(`${process.env.REACT_APP_DOMAIN}/api/checkout/save-address?token=true`,
            {
                "billing": {
                    "address1": {
                        "0": formData.street_address
                    },
                    "use_for_shipping": "true",
                    "first_name": formData.first_name,
                    "last_name": formData.last_name,
                    "email": formData.email,
                    "city": formData.city,
                    "state": formData.state,
                    "postcode": formData.postcode,
                    "country": formData.country,
                    "phone": formData.phone
                },
                "shipping": {
                    "address1": {
                        "0": ""
                    }
                }
            },
            {
                withCredentials: true
            }
        )
            .then(response => {
                console.log(response)
                setCartItems(response.data.data.cart)
                history.push('/checkout/payment_method')
                setLoading(false)
            })
            .catch(error=>{
                console.log(error)
                setLoading(false)
            })
    }






    return (
        <>

            <form className={loading && classes.formDisable}>
                <div className="form-row">

                    <div className="form-group col-md-6">
                        <label htmlFor="firstname" className={classes.required}>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="first_name"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleFieldChange}
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="lastname" className={classes.required}>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="last_name"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleFieldChange}
                        />
                    </div>

                </div>

                <div className="form-group">
                    <label htmlFor="company">Company Name (optional)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company_name"
                        placeholder="Company Name"
                        value={formData.company_name}
                        onChange={handleFieldChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className={classes.required}>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email "
                        name="email"
                        value={formData.email}
                        onChange={handleFieldChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="street" className={classes.required}>Street Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="street"
                        name="street_address"
                        placeholder="Street Address "
                        value={formData.street_address}
                        onChange={handleFieldChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city" className={classes.required}>City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        placeholder="City "
                        value={formData.city}
                        onChange={handleFieldChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="country" className={classes.required}>Country</label>
                    {/* <input type="text" className="form-control" id="country" placeholder="Country " />
                 */}
                    <CountryList formData={formData} setFormData={setFormData} />
                </div>
                <div className="form-group">
                    <label htmlFor="state" className={classes.required}>State</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="State"
                        name="state"
                        value={formData.state}
                        onChange={handleFieldChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="zip" className={classes.required}>Zip/PostCode</label>
                    <input
                        type="text"
                        className="form-control"
                        id="zip"
                        placeholder="Zip/PostCode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleFieldChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile" className={classes.required}>Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        placeholder="mobile"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFieldChange}
                    />
                </div>

            </form>
            <div className="text-right mt-3" style={{position:'relative'}}>
                <Button 
                    variant='contained' 
                    onClick={handleSubmit} 
                    color='primary'
                    disabled = {loading}
                    >
                        Next
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </>

    )
}