import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/images.jpeg';
import img2 from '../assets/download.jpeg';
import img3 from '../assets/images (1).jpeg';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold mb-4 text-purple-800">Thrift Hub</h1>

      <p className="text-lg max-w-xl mb-6">
        Your go-to online thrift store for unique, sustainable, and affordable fashion.
        Discover amazing second-hand treasures and give pre-loved items a new life!
      </p>

      {/* Login & Signup buttons */}
      <div className="flex gap-4 mb-8">
        <Link to="/login">
          <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg">
            Signup
          </button>
        </Link>
      </div>

      {/* Image gallery */}
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mb-10">
        <img src={img1} alt="Vintage Clothes" className="w-[300px] h-[300px] object-cover rounded-lg shadow-md" />
        <img src={img2} alt="Thrift Shopping" className="w-[300px] h-[300px] object-cover rounded-lg shadow-md" />
        <img src={img3} alt="Secondhand Fashion" className="w-[300px] h-[300px] object-cover rounded-lg shadow-md" />
      </div>
    </div>
  );
}
