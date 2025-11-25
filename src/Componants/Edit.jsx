import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { auth } from '../Firebaseauth';
import Swal from 'sweetalert2';

const Edit = () => {
  
const [person, setPerson] = useState(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setPerson(currentUser);
  });

  return () => unsubscribe();
}, []);

console.log(person?.accessToken);



  const  {id}  = useParams(); 
  console.log(id);
  const handlecreatpartner = (event) => {
    event.preventDefault();

    const form = event.target;

    const partner = {
      name: form.name.value,
      image: form.image.value,
      subject: form.subject.value,
      mode: form.mode.value,
      time: form.time.value,
      location: form.location.value,
      level: form.level.value,
      rating: form.rating.value,
      count: form.count.value,
      email: form.email.value
    };

    console.log("Sending Data:", partner);


   
    fetch(`https://smart-find-partner-app-server.vercel.app/updateperson/${id}`, {




      method: "PUT",
      headers: {

        "Content-Type": "application/json",
         "Authorization": `Bearer ${person?.accessToken}`  
      },
      body: JSON.stringify(partner)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Updated:", data);
        Swal.fire("Updated Successfully!");
        if( data?.message === "Updated Successfully"){
          window.location.href="/myconnection";
        }
      })
      .catch(err => console.error(err));
  };


  return (
    <div>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
        <h2 className="text-4xl font-semibold mb-4 text-center">Update Partner</h2>

        <form onSubmit={handlecreatpartner} className="space-y-3">
          <input type="text" name='name' placeholder="Full Name" className="w-full border rounded px-3 py-2" />

          <input type="text" name='image' placeholder="Image URL" className="w-full border rounded px-3 py-2" />

          <input type="text" name='subject' placeholder="Subject" className="w-full border rounded px-3 py-2" />

          <select name='mode' className="w-full border rounded px-3 py-2">
            <option>Online</option>
            <option>Offline</option>
          </select>

          <input type="text" name='time' placeholder="Time" className="w-full border rounded px-3 py-2" />

          <input type="text" name='location' placeholder="Location" className="w-full border rounded px-3 py-2" />

          <select name='level' className="w-full border rounded px-3 py-2">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>

          <input type="number" name='rating' placeholder="Rating" className="w-full border rounded px-3 py-2" />

          <input type="number" name='count' placeholder="Partner Count" className="w-full border rounded px-3 py-2" />

          <input type="email" name='email' placeholder="Email" className="w-full border rounded px-3 py-2" />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Updat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
