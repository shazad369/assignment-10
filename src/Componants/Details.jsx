import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebaseauth';
import { useParams } from 'react-router';

const Details = () => {

    const  { id }=useParams();

    console.log(id);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setPerson(currentUser);
    });

    return () => unsubscribe();
  }, []);
console.log(person);


    const [data, setData] = useState([]);
    useEffect(() => {
       fetch(`https://smart-find-partner-app-server.vercel.app/getbyemail/${id}`)

            .then(res => res.json())
            .then(data => setData(data));

    }, [person]);
    console.log(data);
    return (
        <div>
         <div class="max-w-sm mx-auto bg-white shadow-lg rounded-xl overflow-hidden mt-6">

  <div class="flex justify-center mt-4">
    <img class="w-24 h-24 rounded-full border-4 border-indigo-500" src={data.profileimage}></img> 
  </div>

  <div class="text-center mt-4">
    <h2 class="text-xl font-semibold text-gray-800">{data.name}</h2>
    <p class="text-gray-500">{data.email}</p>
  </div>


  <div class="px-6 py-4">
    <p class="text-gray-700"><span class="font-semibold">Subject:</span> {data.subject}</p>
    <p class="text-gray-700"><span class="font-semibold">Study Mode:</span> {data.studyMode}</p>
    <p class="text-gray-700"><span class="font-semibold">Availability:</span> {data.availabilityTime}</p>
    <p class="text-gray-700"><span class="font-semibold">Location:</span>{data.location}</p>
    <p class="text-gray-700"><span class="font-semibold">Experience:</span>{data.experienceLevel}</p>
    <p class="text-gray-700"><span class="font-semibold">Rating:</span>{data.rating} ⭐</p>
    <p class="text-gray-700"><span class="font-semibold">Partners Connected:</span> {data.patnerCount}</p>
  </div>


  <div class="px-6 pb-4 flex justify-center">
    <button class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
      Connect
    </button>
  </div>
</div>

        
        </div>
    );
};

export default Details;