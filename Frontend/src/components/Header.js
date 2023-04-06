import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {InputAdornment, Input} from '@material-ui/core'
import SearchIcon from '@mui/icons-material/SearchOutlined'
import { getAuth } from 'firebase/auth';
import { Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import UnreadChatIcon from '@mui/icons-material/MarkUnreadChatAlt';

export default function NavBar(props) {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    const tabstate = useSelector((state) => state.currentTab)
    const {activeTab} = tabstate
    const history = useLocation();
    const dispatch = useDispatch();
    const changeTab = (value) => {
        dispatch({ type: "changeTab", payload: value })
    }
    useEffect(() => {
        const path = history.pathname.slice(1);
        const homeRoute = path.split('/')[0];
        dispatch({ type: "changeTab", payload: homeRoute })
    }, [dispatch, history.pathname,user])

    const runSearch = (query) => navigate(`/uservenues/${query}`);

    const handleLogout=()=>{
        auth.signOut().then(()=>{
            window.location.reload();
        })
    }

    return (
        <nav className="w-full shadow sticky top-0 bg-white">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block transform transition duration-500 hover:scale-125">
                        <Link to="/" onClick={() => { changeTab("") }}>
                            <h2 className="text-2xl font-bold">SimplyBook</h2>
                        </Link>
                    </div>
                </div>
                <div className='w-1/2'>
                    <Input id='SearchBar' placeholder='Search' startAdornment={<InputAdornment className='hover:cursor-pointer' onClick={e => runSearch(document.getElementById('SearchBar').value)} position='start'><SearchIcon /></InputAdornment>} className="w-3/4 border-b-2 border-gray h-8 p-2" 
                        onKeyDown={e => {
                            if (e.key === 'Enter')
                                runSearch(e.target.value);
                        }}/>
                </div>
                <div>
                    <div className='flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0'>
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 mt-3">
                            <Link to="/venues" className='font-semibold text-md transform transition duration-500 hover:scale-110' style={{color: activeTab==="owner" ? "red" :"black"}} onClick={()=>{changeTab("owner")}}>Owner</Link>
                            <Link to="/uservenues" className='font-semibold text-md transform transition duration-500 hover:scale-110' style={{color: activeTab==="user" ? "red" :"black"}} onClick={()=>{changeTab("user")}}>User</Link>
                            {user ? <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button> : 
                                    <Link to="/signin" className='font-semibold text-md transform transition duration-500 hover:scale-110' style={{color: activeTab==="signin" || activeTab==="signup" ? "red" :"black"}} onClick={()=>{changeTab("signin")}}>Login/SignUp</Link>}
                            <Link to="/contact" className='font-semibold text-lg transform transition duration-500 hover:scale-110' style={{color:activeTab==="contact" ? "red" : "black"}} onClick={()=>{changeTab("contact")}}>Contact</Link>
                            <Link to="/user-profile"><AccountCircleIcon/></Link>
                            <Link to="/chat"><ChatIcon/></Link>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}