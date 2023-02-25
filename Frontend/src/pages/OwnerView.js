import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import VenueCard from '../components/VenueCard';

export default function OwnerView() {
    const navigate = useNavigate();
    return (
    <div>
        <Header />
        <div className='flex flex-col items-center justify-center m-4'>
            <div className='flex'>
                <h4 className='mx-96'><b>Venue Owner View</b></h4>
                <button
                    className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded' 
                    onClick={e => navigate("/addvenue")}>Add Venue</button>
            </div>
            <div className='flex w-full'>
                <VenueCard
                    name='Garrett Fieldhouse' description='Nice little field' address='1025 E 7th St, Bloomington, IN 47405' 
                    sports={["Soccer", "Tennis", "Football", "Baseball"]} timeslots={[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}/>
                <VenueCard 
                    name='Garrett Fieldhouse' description='Nice little field' address='1025 E 7th St, Bloomington, IN 47405' 
                    sports={["Soccer", "Tennis", "Football", "Baseball"]} timeslots={[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}/>
                <VenueCard 
                    name='Garrett Fieldhouse' description='Nice little field' address='1025 E 7th St, Bloomington, IN 47405' 
                    sports={["Soccer", "Tennis", "Football", "Baseball"]} timeslots={[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}/>
            </div>
        </div>
    </div>
    )
}