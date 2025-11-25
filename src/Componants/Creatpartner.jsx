import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { auth } from '../Firebaseauth';
import { onAuthStateChanged } from 'firebase/auth';

const Creatpartner = () => {

  const [person, setPerson] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setPerson(currentUser);
    });

    return () => unsubscribe();
  }, []);

const handlecreatpartner = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const  profileimage = form.image.value;
    const subject = form.subject.value;
    const mode = form.mode.value;
    const time = form.time.value;
   const location = form.location.value;
   const level = form.level.value;
   const rating= form.rating.value;
   const count = form.count.value;
   const email = form.email.value;

    const partner = {
        name,
        
profileimage,
        subject,
        mode,
        time,
        location,
        level,
        rating,
        count,
        email



    }

   fetch('https://smart-find-partner-app-server.vercel.app/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
          "Authorization": `Bearer ${person?.accessToken}` 
    },
    body: JSON.stringify(partner)
})
.then(res => res.json())
.then(data => {
   
    if (data.insertedId || data.success) {
    Swal.fire({
        title: 'Success!',
        text: 'Partner created successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
    });

    form.reset();

} else {
    Swal.fire({
        title: 'Error!',
        text: 'Failed to create partner.',
        icon: 'error',
        confirmButtonText: 'Try Again'
    });
}


})
.catch(err => {
    console.error(err);
    Swal.fire('An error occurred while creating partner.');
});


}




    return (
        <div>
<div class="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
  <h2 class="text-4xl font-semibold mb-4 text-center">Create a Partner</h2>
  <form onSubmit={handlecreatpartner} class="space-y-3">
    <input
    required
      type="text"
      placeholder="Full Name"
      name='name'
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input
    required
      type="text"
      name='image'
      placeholder="Profile Image URL"
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input required
      type="text"
      name='subject'
      placeholder="Subject (e.g., English, Math)"
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <select
      name='mode'
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option>Study Mode</option>
      <option>Online</option>
      <option>Offline</option>
    </select>
    <input required
      type="text"
      name='time'
      placeholder="Availability Time (e.g., 6–9 PM)"
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input required
      type="text"
      name='location'
      placeholder="Location (City/Area)"
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <select required
      name='level'
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option>Experience Level</option>
      <option>Beginner</option>
      <option>Intermediate</option>
      <option>Expert</option>
    </select>
    <input required
      type="number"
      name='rating'
      placeholder="Rating (0-5)"
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input required
      type="number"
      name='count'
      placeholder="Partner Count"
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input required
      type="email"
      name='email'
      placeholder="Email"
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      type="submit"
      class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
    >
      Submit
    </button>
  </form>
</div>



        </div>
    );
};

export default Creatpartner;