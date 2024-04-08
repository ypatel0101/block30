import { useState } from 'react';
import './../index.css';

const Login = ({ onLogin }) => {
  const [email, userEmail] = useState('');
  const [password, userPassword] = useState('');

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    const loginEndpoint = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login';

    try {
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      const userData = await response.json();
      onLogin(userData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLoginFormSubmit}>
        <label>Email:<input type="text" value={email} onChange={(e) => userEmail(e.target.value)} />
        </label>
        <br/>
        <label>Password:<input type="password" value={password} onChange={(e) => userPassword(e.target.value)} />
        </label>
        <br/>
        <button type="submit">Login</button></form>
    </div>
  );
};



export default Login;