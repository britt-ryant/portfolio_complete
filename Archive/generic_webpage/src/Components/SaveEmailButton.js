import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



const SaveEmailButtion=(props) => {

    

    const handleClick = (event) => {
        console.log(props)
    }
    return (
        <div className='save-email-button'>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked color='secondary' />} label='Consent' />
            </FormGroup>
        </div>
    )
}

export default SaveEmailButtion;