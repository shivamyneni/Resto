import React, {useState} from 'react'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Accordion, AccordionSummary, Checkbox, FormControlLabel, AccordionDetails, List, ListItem, ListItemText } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function AddVenue() {
    const navigate = useNavigate();
    const [venueName, setVenueName] = useState('')
    const [venueDesc, setVenueDesc] = useState('')
    const [venueAddress, setVenueAddress] = useState('')
    const [chargable, setChargable] = useState(false)
    const onSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8082/signup",{

        }).then(res => {
            console.log(res)
            if(res.data.error){
                alert(res.data.error)
            } else {
                navigate("/user-info")
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
    return (
        <div>
            <Header />
            <div className='flex flex-col items-center justify-center m-10'>
                <h4 className='m-1'><b>Add a venue!</b></h4>
                <form className='bg-white shadow-md rounded-lg p-8 w-1/3'>                                                                                            
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-bold mb-2'>Venue Name</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="text"
                            label="VenueName"
                            value={venueName}
                            onChange={(e) => setVenueName(e.target.value)}  
                            required                                    
                            placeholder="Enter Venue Name"
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-bold mb-2'>Venue Description</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="text"
                            label="VenueDesc"
                            value={venueDesc}
                            onChange={(e) => setVenueDesc(e.target.value)}  
                            required                                    
                            placeholder="Enter Venue Description"                                
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-bold mb-2'>Venue Address</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="text"
                            label="VenueAddress"
                            value={venueAddress}
                            onChange={(e) => setVenueAddress(e.target.value)} 
                            required                                 
                            placeholder="Enter Venue Address"              
                        />
                    </div>
                    <Accordion>
                        <AccordionSummary className='m-0' expandIcon={<ExpandMoreIcon />}><b>Sports</b></AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {["Soccer", "Tennis", "Football", "Baseball"].map(value => {
                                    return (
                                        <ListItem key={value} className='p-0'>
                                            <Checkbox color='primary' />
                                            <ListItemText primary={value}/>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary className='m-0' expandIcon={<ExpandMoreIcon />}><b>Time Slots</b></AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {[1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map(value => {
                                    return (
                                        <ListItem key={value} className='p-0'>
                                            <Checkbox color='primary' checked={chargable} onChange={(e) => setChargable(e.target.checked)}/>
                                            <ListItemText primary={value}/>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <FormControlLabel control={<Checkbox className='bg-purple-600 hover:bg-purple-700' defaultChecked color='primary' />} label="Chargable" />
                    <div>
                        <button
                            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                            type="submit" 
                            onClick={onSubmit}
                        >Submit</button>
                    </div>      
                </form>
            </div>
        </div>
    )
}