import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../loginform/LoginForm';
import SignInForm from '../signinform/SignInForm';

const Loginsignup = () => {
  const [user, setUser] = useState({});
  const [form, setForm] = useState('');
  const selector = useSelector((state) => state.auth.token);
  console.log('Selector: ', selector);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleFormSwitch = (input) => {
    setForm(input);
  };

  const handleAuthClick = () => {
    const token = selector;
    console.log('token: ', token);
    fetch('http://127.0.0.1:8000/user_is_authed', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log('data: ', data));
  };

  console.log('user :', user);

  const renderForm = () => {
    switch (form) {
      case 'login':
        return <LoginForm handleLogin={handleLogin} />;
      default:
        return <SignInForm handleLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full">
        <div className="text-center text-2xl font-bold mb-8">
          <h1 className="text-gray-900">Welcome!</h1>
        </div>
        <div className="flex space-x-4 mb-4">
          <button type="button" className="bg-gray-900 text-white py-2 px-4 rounded" onClick={() => handleFormSwitch('signUp')}>Sign Up</button>
          <button type="button" className="bg-gray-200 text-gray-900 py-2 px-4 rounded" onClick={() => handleFormSwitch('login')}>Log In</button>
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {renderForm()}
        </div>
        <button type="button" onClick={handleAuthClick} className="bg-gray-900 text-white py-2 px-4 rounded">Access Authorized Route</button>
      </div>
    </div>
  );
};

export default Loginsignup;
