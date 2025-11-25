import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Center from './Center';
import {onAuthStateChanged,   GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '../Firebaseauth';
import "react-toastify/dist/ReactToastify.css";

import Swal from 'sweetalert2';
const Header = () => {





  
  const [person, setPerson] = useState(null);

  useEffect((person) => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setPerson(currentUser);
    });

    
    return () => unsubscribe();
  }, [person]);




const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("User logged out successfully");
    
    })
    .catch((error) => {
      console.log("Logout error:", error.message);
    });
};





  const handlerelod = () => {
    window.location.reload();
  }
    return (
        <div>
        <div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabindex="-1"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul class="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a href="/" class=" text-xl"><img onClick={handlerelod} className='w-22 rounded-2xl'  src="https://imgs.search.brave.com/TRtCzOy6_wdZa-k4NHFWHywnM2cPg9WDdmDIHulmN_k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC80/NC85Ny9oYW5kc2hh/a2UtcGFydG5lcnNo/aXAtbG9nby10ZW1w/bGF0ZS12ZWN0b3It/MjA0MjQ0OTcuanBn" alt="" /></a>
  </div>
  <div class="navbar-center  lg:flex">
    <ul class=" menu-horizontal px-1">
    <Link to="/"><li><a className='btn btn-pramary bg-green-500 pl-4 pr-4 '>Home</a></li></Link>
      <li>
        <div>
       <Link className='btn btn-pramary bg-green-500'  to="/partner">   <summary >Find a partner</summary></Link>
      
        </div>
      </li>
{
  person ?"":(      <li><a className='btn btn-pramary bg-green-500 pl-4 pr-4 '><Link to="/regester">Regester</Link></a></li>)
}
    </ul>

    <ul> <a class="btn btn-pramary bg-green-500 pl-4 pr-4 ">{ person? <Link to="/creatpartner" > create a partner</Link>:(<Link to="/regester" > create a partner</Link>)}</a></ul>
    <ul> <ul> <a class="btn btn-pramary bg-green-500 pl-4 pr-4 ">{ person? <Link to="/myconnnection" >My connection</Link>:(<Link to="/regester" > My connection</Link>)}</a></ul></ul>
  </div>
  <div class="navbar-end ">

    <div> <h3>{person? (
    <img className='w-10 rounded-2xl' src={person.photoURL} alt="" />
  
    )
:""
}</h3></div>
<div><label class="input">
  <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" required placeholder="Search" />
</label></div>
    <a class="btn bg-green-600"> 

  {person ? (
  <p  onClick={logOut}  style={{ cursor: "pointer" }}>Logout</p>
) : (
  <p style={{ cursor: "pointer" }}><Link to="/regester">Login</Link></p>
)}
</a>


<div>  </div>
  </div>
</div>
<div class="bg-slate-500 rounded-2xl text-3xl text-red-500">
    <marquee  behavior="scroll" direction="left" scrollamount="9 ">
 Welcome to Our Platform__
 "Connecting people with opportunities to learn, grow, and succeed in their careers."

 Connect with Experts___
"Collaborate with industry professionals and gain insights from experienced mentors."

 Grow Your Skills__
"Access courses, tutorials, and resources to improve your skills and advance your career."
</marquee>
</div>
            <div>
            
            </div>
        </div>
    );
};


export default Header;