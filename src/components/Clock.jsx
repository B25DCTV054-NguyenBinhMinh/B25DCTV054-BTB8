import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    console.log("Clock timer effect mounted");
    const timerId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      console.log("Clock timer effect cleanup");
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    console.log("Clock clickCount effect", clickCount);
    document.title = `Bấm ${clickCount} lần`;

    return () => {
      console.log("Clock clickCount effect cleanup", clickCount);
    };
  }, [clickCount]);

  console.log("Clock render");

  return (
    <section className="clock-card" aria-label="Đồng hồ">
      <div>
        <p className="eyebrow">Live clock</p>
        <p className="clock-time">{time.toLocaleTimeString("vi-VN")}</p>
      </div>
      <button
        className="primary-button"
        type="button"
        onClick={() => setClickCount((previousClickCount) => previousClickCount + 1)}
      >
        Bấm {clickCount} lần
      </button>
    </section>
  );
}

export default Clock;
