import React, { Component } from "react";
import TimerContext from "../context/timerContext";
import { DateTime, Duration } from "luxon";

class Clock extends Component {
  static contextType = TimerContext;

  render() {
    return (
      <h1 className="text-center">{this.context.remainingTime.toFormat("mm:ss")}</h1>
);
  }
}

export default Clock;
