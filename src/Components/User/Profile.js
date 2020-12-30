import React, { useState, useContext } from 'react'
import { Paper, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import ProfileEdit from './ProfileEdit';
import PersonIcon from '@material-ui/icons/Person';
import { AppContext } from '../../Routes';


const useStyles = makeStyles((theme) => ({
    paper: {
       
        background:'unset',
        padding: '10px',
        marginBottom:'5px',
        ['@media (max-width:480px)']: { 
            minHeight:'300px',    
        }
    },
    tag: {
        fontWeight: 'bold',
        marginRight: '20px',
        fontSize: '16px',
        flex: 1
    },
    name: {
        fontSize: '16px',
        flex: 4
    }
}))


export default function Profile() {

    const [editMode, setEditMode] = useState(false);

    const { user,setUser } = useContext(AppContext);

    const classes = useStyles();

    return (
        <div style={{padding:'10px 0'}}>
            <div className="d-flex justify-content-between" style={{margin:'1rem 0'}}>
                <h5 style={{ fontWeight: 700 }}>Profile</h5>
                <IconButton aria-label="delete" onClick={() => setEditMode(!editMode)} style={{padding:0,marginBottom:'8px'}}>
                    {
                        editMode ?
                            <Tooltip title='Personal Information'>
                                <PersonIcon  />
                            </Tooltip>
                            :
                            <Tooltip title='Edit Information'>
                                <EditIcon />
                            </Tooltip>
                    }
                </IconButton>
            </div>

            <Paper variant='outlined' square className={classes.paper}>

                {
                    editMode ?

                        <ProfileEdit user={user} setUser={setUser} />
                        :
                        <PersonalInfo user={user} />
                }
            </Paper>


        </div>
    )
}


function PersonalInfo({ user }) {

    const classes = useStyles();
    console.log({user})

    const [items, setItems] = useState([
        {
            name:'Name',
            value:user.name,
        },
        {
            name:'Gender',
            value:user.gender != null && user.gender.toUpperCase(),
        },
        {
            name:'Mobile',
            value:user.phone,
        },
        {
            name:'Email',
            value:user.email,
        },
        {
            name:'Date Of Birth',
            value:user.date_of_birth,
        },
    ])

    return (
        <div>

            <table>
                {
                    items.map((item,index)=>(
                        <tr key={index} style={{padding:'5px 0'}}>
                            <td style={{width:'40%',fontWeight:700}}>{item.name}</td>
                            <td style={{width:'20%'}}>:</td>
                            <td>{item.value}</td>
                        </tr>
                    ))
                } 

            </table>


        </div>
    )
}