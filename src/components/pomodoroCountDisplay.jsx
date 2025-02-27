import React, { Component } from "react";
import timerContext from "../context/timerContext";

class PomodoroCountDisplay extends Component {
  static contextType = timerContext;

  handleNextEvent = () => {
    const count = this.context.pomodoroCount;
    const type = this.context.currentTimer;
    
    if (type === "pomodoro" && count % 4 !== 0) {
      return "Short Break";
    } else if (type === "pomodoro" && count % 4 === 0) {
      return "Long Break";
    } else {
      return "Pomodoro";
    }
  };
  render() {
    return (
      <div className="container text-center">
        <i className="fa-solid fa-clock"></i> = {this.context.pomodoroCount}
        <span className="ms-4">Next: {this.handleNextEvent()}</span>
      </div>
    );
  }
}

export default PomodoroCountDisplay;
