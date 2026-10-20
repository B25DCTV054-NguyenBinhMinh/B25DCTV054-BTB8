import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      clickCount: 0,
    };
    console.log("Clock constructor");
  }

  componentDidMount() {
    console.log("Clock componentDidMount");
    this.timerId = window.setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Clock componentDidUpdate");
    if (prevState.clickCount !== this.state.clickCount) {
      document.title = `Bấm ${this.state.clickCount} lần`;
    }
  }

  componentWillUnmount() {
    console.log("Clock componentWillUnmount");
    window.clearInterval(this.timerId);
  }

  handleClick = () => {
    this.setState((prevState) => ({
      clickCount: prevState.clickCount + 1,
    }));
  };

  render() {
    console.log("Clock render");
    const { time, clickCount } = this.state;

    return (
      <section className="clock-card" aria-label="Đồng hồ">
        <div>
          <p className="eyebrow">Live clock</p>
          <p className="clock-time">{time.toLocaleTimeString("vi-VN")}</p>
        </div>
        <button className="primary-button" type="button" onClick={this.handleClick}>
          Bấm {clickCount} lần
        </button>
      </section>
    );
  }
}

export default Clock;
