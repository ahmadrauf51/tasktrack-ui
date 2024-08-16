import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      navigate('/dashboard');
    }
  }, [success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mt-8 mb-2">
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Password"
            required
          />
        </div>
        <p className="text-sm mb-5">
          Have an account?{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
        <button
          type="submit"
          className={`w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-5 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      </form>
    </div>
  );
}

export default Register;
