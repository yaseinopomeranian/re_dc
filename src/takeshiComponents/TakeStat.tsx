import React, { useEffect, useState } from 'react';

function TakeStat() {
  const [message, setMessage] = useState<string>('Loading...');

  useEffect(() => {
    //fetch('http://192.168.33.11:10000/take-Stat/')  // Django のエンドポイント
    fetch('https://dj-dc-ver0-1.onrender.com/take-Stat/')  // Django のエンドポイント
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>React + Django</h1>
      <p>Message from Django: {message}</p>
    </div>
  );
}

export default TakeStat;
