import React,{useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    btnRoot: {
        padding: '5px 10px',
        '&:focus': {
            outline: 'none'
        },
        ['@media (max-width:480px)']: { 
            padding:0,
        }
        
    },
    qtyNum:{
        padding: '4px', 
        fontWeight: 700,
        ['@media (max-width:480px)']: { 
            padding:'4px 5px',
        },

    },
    label:{
        '&:hover':{
            background:'#DADADA'
        }
    },

    container:{
        display:'flex',
        border: '1px solid rgba(0,0,0,.2)',
        justifyContent:'center',
        ['@media (max-width:480px)']: { 
            justifyContent:'flex-end',
            border:'unset',
        }, 
    }
}))

export default function Quantity({quantity,setQuantity}) {


    const classes = useStyles();


    return (
        <div className={classes.container}>
            <IconButton classes={{root:classes.btnRoot,label:classes.label}} onClick={() => setQuantity(quantity + 1)}>
                <AddIcon size='small' />
            </IconButton>
            <div className={classes.qtyNum} >{quantity}</div>
            <IconButton classes={{root:classes.btnRoot,label:classes.label}} onClick={() => quantity > 1 ? setQuantity(quantity - 1) : null}>
                <RemoveIcon size='small' />
            </IconButton>
        </div>
    )
}

Quantity.defaultProps = {
    quantity: 1
}
