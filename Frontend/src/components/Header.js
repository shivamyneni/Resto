import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
    const activeTab = useSelector((state) => state.activeTab)
    const history = useLocation();
    const dispatch = useDispatch();
    const changeTab = (value) => {
        dispatch({ type: "changeTab", payload: value })
    }
    useEffect(() => {
        const path = history.pathname.slice(1);
        const homeRoute = path.split('/')[0];
        dispatch({ type: "changeTab", payload: homeRoute })
    }, [dispatch, history.pathname])

    return (
        <nav className="w-full shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block transform transition duration-500 hover:scale-125">
                        <Link to="/" onClick={() => { changeTab("") }}>
                            <h2 className="text-2xl font-bold">SimplyBook</h2>
                        </Link>
                    </div>
                </div>
                <input style={{ height: "2rem" }} className="w-1/2 border-b-2 border-gray" />
                <div>
                    <div className='flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0'>
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 mt-3">
                            <Link to="/signin" className='font-semibold text-md transform transition duration-500 hover:scale-110' style={{color:activeTab==="signin" ? "red": activeTab==="signup" ? "red" :"black"}} onClick={()=>{changeTab("signin")}}>Login/SignUp</Link>
                            <Link to="/contact" className='font-semibold text-lg transform transition duration-500 hover:scale-110' style={{color:activeTab==="contact" ? "red":"black"}} onClick={()=>{changeTab("contact")}}>Contact</Link>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}