import React, { useState, useEffect } from 'react';
import './TakeStat.css';

function TakeStat() {
  // タブのタイトルを変更
  useEffect(() => {
    document.title = "Take★Stat"; // タイトル変更
  }, []); // 初回レンダリング時にのみ実行される

  // 画像のURLを格納するためのstate
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // プルダウンリストで選択した値を格納するためのstate
  const [selectedValue, setSelectedValue] = useState<string>('');

  // ローディング状態を管理するstate
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Djangoから画像を取得するAPIエンドポイント
  const fetchImage = async (val: string) => {
    setIsLoading(true); // ローディング開始

    try {
      const response = await fetch(`https://dj-dc-ver0-1.onrender.com/take-Stat/?option=${val}`, {
        method: 'GET'
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url); // 画像を表示するためにURLをstateにセット
      } else {
        console.error('画像取得エラー');
      }
    } catch (error) {
      console.error('エラー:', error);
    } finally {
      setIsLoading(false); // ローディング終了
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
      alert('リストから県を選択してください');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Take★Stat (React + Django)</h1>
      <div className="controls">
        {/* プルダウンリストを表示 */}
        <select value={selectedValue} onChange={handleChange} disabled={isLoading}>
          <option value="">選択してください</option>
          <option value="1">北海道</option>
          <option value="2">山梨</option>
        </select>
        {/* 送信ボタン */}
        <button onClick={handleSubmit} disabled={isLoading}>表示</button>
      </div>

      {/* 画像が取得されるまで「Loading...」を表示 */}
      {imageSrc ? (<p></p>)
	        : isLoading ? (<p className="loading">画像取得中...</p>)
                            : (<p className="loading">こにグラフが表示されます</p>)
      }
      {imageSrc &&
        <div className="image-container">
          <img src={imageSrc} alt="Line Chart" />
        </div>
      }
    </div>
  );
}

export default TakeStat;

