import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContenet from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import toast, {Toaster} from 'react-hot-toast';
//import _default from '@emailjs/browser';

//Components import

import SaveEmailButtion from './SaveEmailButton';


export const EmailForm = () => {
    const form = useRef();
    const [formData, setFormData] = useState({first: "", last: "", email: "", message: ""});
    const [error, setError] = useState({first: false, last: false, email: false, message: false});
    let errorTitle = {
        first: "First Name",
        last: "Last Name", 
        email: "Email",
        message: "Message"
    };  
    
    const addFormData = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value});
    };

    const handleFieldCheck = (event) => {
        event.preventDefault(); 
        for(let key in formData) {
            if(formData[key] === "" && key !== "email"){
                setError((error) => ({...error, [key]: true}))
                toast.error(`Please make sure ${errorTitle[key]} is filled out correctly`,
                {duration: 3000
                });
            } else if(key === "email") {
                if(formData[key] === "" || !event.currentTarget.email.checkValidity()){
                    setError((error) => ({...error, [key]: true}));
                    toast.error(`Please make sure ${errorTitle[key]} is formatted and filled out completely`, {
                        duration: 3000,
                    });
                } else{
                    setError((error) => ({...error, [key]: false}))
                }
            } else {
                setError((error) => ({...error, [key]: false}))
            }
        }
        event.currentTarget.checkValidity() ? devEmail(event) : console.log("dont send email");
    };
//*********************** DEVELOPMENT FUNCTION  ***************************/
    const devEmail = (event) => {
        //event.preventDefault();
        toast.success("Dev email requst sent successfully!", {
            duration: 5000,
        })
        event.target.reset();
    };
//************************************************************************* */

    const sendEmail = (event) => {
        event.preventDefault();
        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY)
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          toast.success("Your request has been sent!",
          {
            duration: 5000
          })
          event.target.reset();
  };

  return (
    <div className='form-container'>

        <div className='new-form'>
            <Toaster 
                position='top-left'
                reverseOrder={true}
               />
            <Grid 
                container
                justifyContent="center"
                alignItems='center'
                direction='column'
                style={{minHeight: "100vh", maxHeight: "500vh"}}
                >
                <Card sx={{minWidth: 275, maxWidth: 500, justifyContent: 'center', display: 'flex', minHeight: 100, maxHeight: 500}}>
                    <CardContenet sx={{height: 500}}>
                        <Box
                            ref={form}
                            onSubmit={handleFieldCheck}
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Typography gutterBottom variant="h4" component="div">Request a Quote</Typography>
                            <TextField  error={error.first} 
                                        id="outlined-basic" 
                                        label="First Name" 
                                        variant="outlined" 
                                        name='first' 
                                        value={formData.first} 
                                        onChange={addFormData} 
                                        required/>
                            <TextField  error={error.last} 
                                        id="outlined-basic" 
                                        label="Last Name" 
                                        variant="outlined"  
                                        name='last' 
                                        value={formData.last} 
                                        onChange={addFormData} 
                                        required/>
                            <TextField  error={error.email} 
                                        id="outlined-basic" 
                                        label="Email" 
                                        variant="outlined" 
                                        type="email" 
                                        name='email' 
                                        value={formData.email} 
                                        onChange={addFormData} 
                                        equired/>
                            <TextField  error={error.message} 
                                        id="outlined-multiline-flexible" 
                                        label="Message" 
                                        name='message' 
                                        multiline 
                                        maxRows={4} 
                                        value={formData.message} 
                                        onChange={addFormData} 
                                        required/><br></br>
                            <SaveEmailButtion data={{
                                                        first: formData.first,
                                                        last: formData.last,
                                                        email: formData.email,
                                                        message: formData.message
                                                    }} />
                            <Button variant='contained' type="submit">Submit</Button>
                         </Box>
                    </CardContenet>
                </Card>
            </Grid>
        </div>
    </div>
  );
};