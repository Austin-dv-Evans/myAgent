import React from 'react';
import { Link } from "react-router-dom";


export default function Nav(){
    return <footer className="navbar" >
        <nav>
            <Link to='/docs'>
            <li> Docs </li>
            </Link>
            <Link to='/home'>
            <li>myGigs</li>
            </Link>
            <Link to='/addGigForm'>
                <li>+Gig</li>
            </Link>
        </nav>
    </footer>
}