import React, { Component } from "react";
import TimerContext from "../context/timerContext";

class IntervalControllers extends Component {
  static contextType = TimerContext;
  render() {
    return (
      <div className="container ">
        <div className="d-inline-flex">
          <button
            id="pomodoro"
            onClick={this.context.handleBtnClick}
            className="btn "
          >
            Pomodoro
          </button>
          <button
            id="short-break"
            onClick={this.context.handleBtnClick}
            className="btn "
          >
            Short Break
          </button>
          <button
            id="long-break"
            onClick={this.context.handleBtnClick}
            className="btn "
          >
            Long Break
          </button>
        </div>
      </div>
    );
  }
}

export default IntervalControllers;
