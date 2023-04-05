import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Conversation from '../components/Conversation';

export default function Chat() {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([])
    useEffect(() => {
        let id = 1;
        axios.get(`/conversations/${id}/`).then(res => {
            console.log(res.data)
            if (res.data.error) {
                alert(res.data.error)
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }, [])
    return (
    <div>
        <Header />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-screen'>
            {
                conversations.map(value => {
                    return (
                        <Conversation access="owner" key={value._id} id={value._id} name={value.name} timeslot={value.timeslot} availability={value.availability}/>
                    )
                })
            }
        </div>
    </div>
    )
}