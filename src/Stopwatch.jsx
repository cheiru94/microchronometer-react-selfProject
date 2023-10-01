import { useEffect, useState, useLayoutEffect } from "react";

// 🟢 1. Stopwatch 컴포넌트 ( Timer 컴포넌트의 부모)
const Stopwatch = () => {
  const [isDisp, setIsDisp] = useState(true);  // 화면의 표시 상태를 관리

  return (
    <>
      {isDisp && <Timer />} {/* isDisp이 true이면 Timer 컴포넌트를 보이게 */}
      <button onClick={() => setIsDisp(prev => !prev)}>{isDisp ? "非表示" : "表示"}</button>  {/* isDisp이 true이면 非表示 표시 , false이면 表示 표시 */}
    </>
  )
}


// 🟢 2. Timer 컴포넌트 (Stopwatch 컴포넌트의 자식)
const Timer = () => {
  const [time, setTime] = useState(0); // 현재 측정 시간 관리
  const [isRunning, setIsRunning] = useState(false);  // 스탑워치가 실행되고 있는지 관리

  // 2.1  useEffect 🚩
  useEffect(() => {
    let intervalId = null;

    // 스탑워치가 실행되고 있다면 setInterval함수를 사용하여 초를 1초마다 1씩 증가
    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    // 언마운트시 타이머 중지
    return () => {
      window.clearInterval(intervalId)
    }
  }, [isRunning]) //  의존 배열로 isRunning을 감시 



  // 2.2 useEffect 🚩
  useEffect(() => {
    document.title = 'counter:' + time; // title에 현재 초 표시
    window.localStorage.setItem('time-key', time); // 로컬스토리지에 초 저장

    return () => {
      // debugger
    }
  }, [time]); //  의존 배열로 time 감시 

  // 2.3 useLayoutEffect 🚩🚩
  useLayoutEffect(() => {  // 렌더링 되기 전에 값을 읽어옴
    const _time = parseInt(window.localStorage.getItem('time-key')); // 로컬스토리지에 초 불러오기 
    if (!isNaN(_time)) { // 로컬스토리지 값은 문자로 저장되어 숫자로 변환 
      setTime(_time); // 현재 초시간에 대입
    }
  }, [])

  // "一時停止" : "スタート 버튼용 토글 함수
  const toggle = () => {
    setIsRunning(prev => !prev)
  }

  // reset버튼용 함수
  const reset = () => {
    if (isRunning) {
      setIsRunning(prev => !prev)
      setTime(0)
    }

  }

  return (
    <>
      <h1>
        <time style={{color:"#646cff"}}>{time}</time>
        <span>秒経過</span>
      </h1>
      <div>
        <button onClick={toggle}>{isRunning ? "一時停止" : "スタート"}</button>
        <button onClick={reset}>リセット</button>
      </div>
    </>
  );
};

export default Stopwatch;
