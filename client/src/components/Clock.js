import React, { useState, useEffect } from 'react';

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // 1초마다 현재 시간 설정
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 컴포넌트가 언마운트될 때 setInterval 정리
    return () => {
      clearInterval(interval); // setInterval을 중지
    };
  }, []);

  // 시간 포맷 설정
  const options = {
    hour12: true, // 시간을 12시간 형식으로 표시
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <div className="text-6xl">
      <h1>{currentTime.toLocaleTimeString('en-US', options)} </h1>
    </div>
  );
}

export default Clock;
