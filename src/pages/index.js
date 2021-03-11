import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

export default function Home() {
  const router = useRouter();
  const [ user, setUser ] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/user');
      if (res.status === 401) {
        console.log("== Redirecting to /login");
        router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
      } else {
        const body = await res.json();
        setUser(body);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
      {user.name && <p>Name: {user.name}</p>}
      {user.email && <p>Email: {user.email}</p>}
    </div>
  );
}
