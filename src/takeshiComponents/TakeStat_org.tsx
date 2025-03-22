import React, { useEffect, useState } from 'react';

function TakeStat() {
  //const [message, setMessage] = useState<string>('Loading...');
  //const [message, setMessage] = useState([]);

  // 画像のURLを格納するためのstate
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // プルダウンリストで選択した値を格納するためのstate
  const [selectedValue, setSelectedValue] = useState<string>('');

  // Djangoから画像を取得するAPIエンドポイント
  const fetchImage = async (val: string) => {
//  const response = await fetch('http://192.168.33.11:10000/take-Stat/?option=${val}');
    const response = await fetch('https://dj-dc-ver0-1.onrender.com/take-Stat/?option=${val}',{
      method: 'GET'
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageSrc(url); // 画像を表示するためにURLをstateにセット
    } else {
      console.error('画像取得エラー');
    }
  };

  // プルダウンリストの選択肢が変更されたときの処理
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  // 送信ボタンがクリックされたときに画像を取得する
  const handleSubmit = () => {
    if (selectedValue) {
      fetchImage(selectedValue); // 選択した値に基づいて画像を取得
    } else {
      alert('選択してください');
    }
  };

  return (
    <div>
      <h1>Take★Stat (React + Django)</h1>

      {/* プルダウンリストを表示 */}
      <select value={selectedValue} onChange={handleChange}>
        <option value="">選択してください</option>
        <option value="option1">オプション1</option>
        <option value="option2">オプション2</option>
        <option value="option3">オプション3</option>
      </select>

      {/* 送信ボタン */}
      <button onClick={handleSubmit}>送信</button>

      {/* 画像が取得されるまで「Loading...」を表示 */}
      {imageSrc ? (
        <img src={imageSrc} alt="Line Chart" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TakeStat;
