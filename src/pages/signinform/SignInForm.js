import React, { useState } from 'react';

function SignInForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem('token', data.jwt);
        props.handleLogin(data.user);
      });
    setUsername('');
    setPassword('');
  };

  return (
    <div className="mx-auto p-8 w-80">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Username</label>
          <input
            value={username}
            onChange={handleUsernameChange}
            type="text"
            placeholder="username"
            className="border border-gray-400 p-2 w-full rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="password"
            className="border border-gray-400 p-2 w-full rounded-lg"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
