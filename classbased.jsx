//我不会ts所以用js写的
import React, { useState, useEffect } from 'react';

const UserData = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [seconds, setSeconds] = useState(0);

  const fetchUserData = () => {
    fetch(`https://secret.url/user/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));
  };

  useEffect(() => {
    fetchUserData();
    
    // 在 useEffect 中定义定时器，并在卸载时清除它
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // 清理函数，在组件卸载时清除定时器
    return () => {
      clearInterval(intervalId);
    };
  }, [userId]); // 当 userId 改变时重新运行 effect

  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default UserData;
