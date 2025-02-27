import React, { Component } from "react";
import timerContext from "../context/timerContext";

class InitiatorBtn extends Component {
  static contextType = timerContext;

  handleDisplay = (type) => {
    if (this.context.currentStatus === "stop") {
      return {
        display: type === "start" ? "block" : "none",
      };
    } else {
      return {
        display: type === "start" ? "none" : "block",
      };
    }
  };

  handleText = (type) => {
    const text = this.context.currentStatus;
    const status = this.context.currentTimer;
    if (status === "pomodoro") {
      if (text === "start") {
        return type === "id" ? "pause" : "Pause";
      } else if (text === "pause") {
        return type === "id" ? "resume" : "Resume";
      }
    } else {
        return type === "id" ? "skip-break" : "Skip Break";
    }
  };

  handleId = () => {
    const text = this.context.currentStatus;
    if (text === "start") {
      return "pause";
    } else {
      return "resume";
    }
  };

  render() {
    return (
      <div className="container text-center justify-content-between">
        <div className="row text-center ">
          <div className="col" style={this.handleDisplay("start")}>
            <button
              id="start"
              onClick={this.context.handleBtnClick}
              className="btn col-4"
            >
              Start
            </button>
          </div>
          <div style={this.handleDisplay("resume")}>
            <button
              id={this.handleText("id")}
              onClick={this.context.handleBtnClick}
              className="btn"
            >
              {this.handleText("text")}
            </button>
            <button
              id="reset"
              onClick={this.context.handleBtnClick}
              className="btn"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default InitiatorBtn;
