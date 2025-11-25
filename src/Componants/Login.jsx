import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Link, Navigate } from 'react-router';
import Swal from 'sweetalert2';


const Login = () => {
    const handleLogin = (e) =>{
e.preventDefault()
const form = e.target
const email = form.email.value
const password = form.password.value
const photoURL = form.photo.value

console.log(email,password,photoURL);


const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  
    const user = userCredential.user;
    // ...
    console.log(user);
    Swal.fire("Login Successfull");
    return Navigate('/');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
 Swal.fire("Login Failed");
    Swal.fire("Login Failed");
    console.log(errorCode,errorMessage);
  });



    }


    return (
        <div>
           <div class="hero bg-base-200 min-h-screen">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Login now!</h1>
      <p class="py-6">
       "Regester in is more than just entering a password—it's claiming your digital identity. Each time you log in, you say: ‘This is me, and I am ready to explore, create, and connect.’

Step in, and unlock the door to your world of possibilities."
      </p>
    </div>
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div class="card-body">
        <form onSubmit={handleLogin} class="fieldset">
          <label name='email' class="label">Email</label>
          <input name = 'email' type="email" class="input" placeholder="Email" />
            <label name='PhotoURL' class="label">Photo URL</label>
          <input name = 'photo' type="text" class="input" placeholder="Photo URL" />
          <label class="label">Password</label>
          <input name='password' type="password" class="input" placeholder="Password" />
          <div><a class="link link-hover">Forgot password? Don't have any account? please <Link to="/regester"><h3 className='bg-red-600 rounded-md'>Regester</h3></Link></a></div>
          <button type='submet' class="btn btn-neutral mt-4">Login</button>
        </form>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;