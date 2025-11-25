import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

import { Link, Navigate } from 'react-router';
import Swal from 'sweetalert2';


const Regester = () => {








const auth = getAuth();

const handlesubmit = (event) => {
    event.preventDefault();
    const form = event.target;

  const email = form.email.value;
  const photoURL = form.photo.value;
  const password = form.password.value;

 

  if (password.length < 8) {
    Swal.fire("Password must be at least 8 characters long");
    return;
  }
  if (password.search(/[a-z]/i) < 0) {
    Swal.fire("Password must contain at least one letter");
    return;
  }
  if (password.search(/[0-9]/) < 0) {
    Swal.fire("Password must contain at least one number");
    return;
  }


  console.log("Email:", email);
  console.log("Photo URL:", photoURL);
  console.log("Password:", password);

    
    
    createUserWithEmailAndPassword(auth, email, password, photoURL)
  .then((userCredential) => {
  
    const user = userCredential.user;
    console.log(user);
    // ...
  })  
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    console.log(errorCode);
    // ..
  });  


  }




  



    

    
    const signin = () => {
      const provider = new GoogleAuthProvider();
    
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
        Swal.fire("Login Successfull");
        console.log(user);
        if (user) {
         navigator('/');
          setPerson(user);
        }
      
        })
        .catch((error) => {
          console.log("Sign-in error:", error.message);
        });  
    };    
    





    // const signout = () => {
    //   signOut(auth)  
    //     .then(() => {
    //       console.log("User signed out successfully");  
    //       // setPerson(null);
    //     })
    //     .catch((error) => {
    //       console.log("Sign-out error:", error.message);  
        // });
    // };


   const [person, setPerson] = useState(null); 

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user);
        setPerson(user);
      } else {
        console.log("User logged out");
        setPerson(null);
      }  
    });  

 
    return () => unsubscribe();
  }, []);  

    console.log("person",person);
    
    
    
if (person) {
    return <Navigate to="/" />;
  }
    



   
    return (
        <div>
            
<div class="hero bg-base-200 min-h-screen">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Regester now!</h1>
      <p class="py-6">
      "Logging in is more than just entering a password—it's claiming your digital identity. Each time you log in, you say: ‘This is me, and I am ready to explore, create, and connect.’

Step in, and unlock the door to your world of possibilities."
      </p>
    </div>
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div class="card-body">
        <form onSubmit={handlesubmit} class="fieldset">
          <label class="label">Email</label>
          <input name='email' required type="email" class="input" placeholder="Email" />
          <label class="label">Photo URL</label>
          <input name='photo' required  type="text" class="input" placeholder="Photo URL" />
          <label class="label">Password</label>
          <input required name='password' type="password" class="input" placeholder="Password" />
          <div><a class="link link-hover"> already have an account please <Link  to="/login"><h1 className='bg-red-500 rounded-xl font-bold text-white'>Login</h1></Link></a></div>
          <button type='submit' class="btn btn-neutral mt-4">Login</button>
   
        </form>
               <button onClick={signin} class="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
      </div>
    </div>
  </div>
</div>


        </div>
    );
};

export default Regester;