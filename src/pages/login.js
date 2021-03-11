import React, { useState } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

function Login() {
  const router = useRouter();
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    console.log("== Logging in with these credentials:", username, password);
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const resBody = await res.json();
    if (res.status !== 200) {
      alert(resBody.err || "Undefined error")
    } else {
      console.log("== Successfully logged in, cookie:", document.cookie);
      router.push(router.query.redirect || '/');
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
}

export default Login;
