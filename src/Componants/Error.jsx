import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <h1 className="text-[10rem] font-bold drop-shadow-lg animate-bounce">404</h1>
      <p className="text-2xl md:text-3xl mt-4 drop-shadow-md">
        Oops! Page not found.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
        </div>
    );
};

export default Error;