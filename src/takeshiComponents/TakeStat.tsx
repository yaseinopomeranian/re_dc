import React, { useEffect, useState } from 'react';

function TakeStat() {
  //const [message, setMessage] = useState<string>('Loading...');
  //const [message, setMessage] = useState([]);

  // 初期値をnullにし、型をstring | nullに指定
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    //iconst fetchImage = async () => {
    //fetch('http://192.168.33.11:10000/take-Stat/')  // Django のエンドポイント
    //fetch('https://dj-dc-ver0-1.onrender.com/take-Stat/')  // Django のエンドポイント
    //  .then(response => response.json())
    //  .then(data => setMessage(data.message))
    //  .catch(error => console.error('Error:', error));

    // Djangoから画像を取得するAPIエンドポイント
    const fetchImage = async () => {
      const response = await fetch('http://192.168.33.11:10000/take-Stat/');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
    };

    fetchImage();
  }, []);

  return (
    <div>
      <h1>Take★Stat(React + Django)</h1>
      {/*<p>Message from Django: {message}</p>*/}
      {imageSrc ? (
        <img src={imageSrc} alt="Line Chart" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TakeStat;
