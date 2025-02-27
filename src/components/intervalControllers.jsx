import React, { Component } from "react";
import TimerContext from "../context/timerContext";

class IntervalControllers extends Component {
  static contextType = TimerContext
  render() {
    return (
      <div className="container justify-content-between">
          <button id="pomodoro" onClick={this.context.handleBtnClick} className="btn col">Pomodoro</button>
          <button id="short-break" onClick={this.context.handleBtnClick} className="btn col">Short Break</button>
          <button id="long-break" onClick={this.context.handleBtnClick} className="btn col">Long Break</button>
      </div>
    );
  }
}

export default IntervalControllers;
