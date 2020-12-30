import React, { useState } from 'react'

export default function Common({initData}) {
    const [formData, setFormData] = useState(initState);

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
        formData.errors.hasOwnProperty(field) ? <small style={{ color: 'red' }}>{loginData.errors[field][0]}</small> : ''
    )


    return [formData, handleFieldChange, hasError,renderError]
}


