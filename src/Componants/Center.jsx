import React, {  useEffect, useState } from 'react';
import Findpartner from './Findpartner';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebaseauth';
import { Link } from 'react-router';

const Center = () => {













  

const [users, setUsers] = useState([]);

console.log(users);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setPerson(currentUser);
    });

    return () => unsubscribe();
  }, []);

useEffect(() => {
    fetch('https://smart-find-partner-app-server.vercel.app/allproducts')
        .then(res => res.json())
        .then(data => setUsers(data));
}, []);



if (users.length === 0) {
    return <Findpartner></Findpartner>;
}



    return (
       <div>

 <h4 className='text-3xl text-green-500 mt-4 mb-4 font-bold'> SOME PARTNER SHOULD YOU LINKE IT   </h4>
         <div className='grid lg:grid-cols-4 sm:grid-cols-2'>


       
            
{
    users.map(user => 
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden m-4 hover:shadow-xl transform hover:scale-105 transition duration-300">
      <img
        className="w-full h-48 object-cover"
        src={user.profileimage}
        alt={user.name}
      />
      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}  </h2>
        <p className="text-gray-600 mt-1"><strong>Subject:</strong> {user.subject}</p>
        <p className="text-gray-600"><strong>Study Mode:</strong> {user.studyMode}</p>
        <p className="text-gray-600"><strong>Availability:</strong> {user.availabilityTime}</p>
        <p className="text-gray-600"><strong>Location:</strong> {user.location}</p>
        <p className="text-gray-600"><strong>Experience:</strong> {user.experienceLevel}</p>
        <p className="text-yellow-500 mt-2"><strong>Rating:</strong> {user.rating} ⭐</p>
        <p className="text-gray-500"><strong>Connections:</strong> {user.patnerCount}</p>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition">
            {
            person ? (
            <Link  to={`/detail/${encodeURIComponent(user.email)}`}> View Profile</Link>
            ) : (
            <Link to="/regester"> View Profile</Link>
            )
          }
        </button>
      </div>
    </div>
)
    
}
         

        </div>
       </div>
    );
};

export default Center;