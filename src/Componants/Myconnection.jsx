import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebaseauth';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Myconnection = () => {

const [person, setPerson] = useState("");



  const [dataform, setDataform] = useState([]);
    useEffect(() => {
         if (person?.email) { 
    const url = `https://smart-find-partner-app-server.vercel.app/getbyperson/${encodeURIComponent(person.email)}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setDataform(data));
  }
    }, [person]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setPerson(currentUser);
    });


    
    return () => unsubscribe();
  }, []);



const handledelete = (id) => {
  if (Swal.fire("Are you sure you want to delete this person?")) {
    fetch(`https://smart-find-partner-app-server.vercel.app/deleteperson/${id}`, {
      method: "DELETE",
      headers: {

     "Authorization": `Bearer ${person?.accessToken}`,

        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data?.message === "Person deleted successfully") {
         
          setDataform(prevData => prevData.filter(item => item._id !== id));
        }
      })
      .catch(err => console.error(err));
  }
};





    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
 {
    dataform.map((data)=>            
<div className='grid grid-cols-4'>

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


  <div class=" pb-4">
    <div class="flex justify-center">
    <div className="flex gap-12"> 
      <h3 className='bg-green-500 pl-6 pr-6 rounded-2xl pt-1 pb-1'> <Link to={`/edit/${data._id}`}>Edit</Link> </h3>
      <h1 onClick={() => handledelete(data._id)} className='bg-green-500 btn  pl-6 pr-6 rounded-2xl pt-1 pb-1'>Remove </h1>
    </div>
    </div>
  </div>
</div>



</div>)
 }
            
        </div>
    );
};

export default Myconnection;