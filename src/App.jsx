// App.js
import React, { useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { ToastContainer } from 'react-toastify';

function App() {
  const [formType, setFormType] = useState('login'); // 'login' or 'register'

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-100 via-indigo-100 to-purple-100 flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-purple-800">Thrift Hub</h1>

      <div className="mb-4 space-x-4">
        <button
          className={`px-4 py-2 rounded ${formType === 'login' ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}
          onClick={() => setFormType('login')}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 rounded ${formType === 'register' ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}
          onClick={() => setFormType('register')}
        >
          Register
        </button>
      </div>

      <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-md">
        {formType === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
