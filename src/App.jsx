import { DateTime, Duration } from "luxon";
import Clock from "./components/clock";
import TimerContext from "./context/timerContext";
import React, { Component } from "react";
import IntervalControllers from "./components/intervalControllers";
import InitiatorBtn from "./components/initiatorBtn";
import PomodoroCountDisplay from "./components/pomodoroCountDisplay";
import startSound from "./assets/sounds/start.mp3";
import endSound from "./assets/sounds/end.mp3";
import NavBar from "./components/navbar";

class App extends Component {
  state = {
    pomodoroTimer: 25,
    shortBreak: 5,
    longBreak: 30,
    remainingTime: Duration.fromObject({ minutes: 25 }),
    pomodoroCount: 1,
    currentStatus: "stop",
    currentTimer: "pomodoro",
  };

  timerStartSound = () => {
    const audio = new Audio(startSound);
    audio.play();
  };

  timerEndSound = () => {
    const audio = new Audio(endSound);
    audio.play();
  };

  componentDidMount() {
    this.applyBtnStyle();
    this.setState({
      remainingTime: Duration.fromObject({ minutes: this.state.pomodoroTimer }),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentTimer !== this.state.currentTimer) {
      this.applyBtnStyle();
    }

    if (
      this.state.currentStatus === "start" &&
      prevState.currentStatus !== "start"
    ) {
      clearInterval(this.interval);
      this.interval = setInterval(this.reduceRemainingTime, 1000);
    }

    if (
      this.state.currentStatus !== "start" &&
      prevState.currentStatus === "start"
    ) {
      clearInterval(this.interval);
    }
    if (
      prevState.pomodoroTimer !== this.state.pomodoroTimer ||
      prevState.shortBreak !== this.state.shortBreak ||
      prevState.longBreak !== this.state.longBreak
    ) {
      let time;
      switch (this.state.currentTimer) {
        case "pomodoro":
          time = this.state.pomodoroTimer;
          break;
        case "short-break":
          time = this.state.shortBreak;
          break;
        case "long-break":
          time = this.state.longBreak;
          break;
      }
      this.setState({ remainingTime: Duration.fromObject({ minutes: time }) });
    }
  }

  applyBtnStyle = () => {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((btn) => {
      btn.className = "btn mx-1 my-3";
      if (btn.id === this.state.currentTimer) {
        btn.classList.add("btn-dark");
      } else {
        btn.classList.add("btn-outline-dark");
      }
    });
  };

  handleBtnClick = (event) => {
    const eventType = event.target.id;
    let min;

    switch (eventType) {
      case "pomodoro": {
        min = this.state.pomodoroTimer;
        this.setState({ currentTimer: "pomodoro" });
        break;
      }
      case "short-break": {
        min = this.state.shortBreak;
        this.setState({ currentTimer: "short-break" });
        break;
      }
      case "long-break": {
        min = this.state.longBreak;
        this.setState({ currentTimer: "long-break" });
        break;
      }
      case "start": {
        this.setState({ currentStatus: "start" });
        this.timerStartSound();
        return;
      }
      case "pause": {
        this.setState({ currentStatus: "pause" });
        return;
      }
      case "resume": {
        this.setState({ currentStatus: "start" });
        this.timerStartSound();
        return;
      }
      case "reset": {
        this.setState({
          currentStatus: "stop",
          remainingTime: Duration.fromObject({
            minutes: this.state.pomodoroTimer,
          }),
        });
        return;
      }
      case "skip-break": {
        min = this.state.pomodoroTimer;
        this.setState({
          currentStatus: "start",
          currentTimer: "pomodoro",
          remainingTime: Duration.fromObject({ minutes: min }),
        });
        this.timerStartSound();
        return;
      }
      default:
        console.error(`Unknown event type: ${eventType}`);
    }

    if (min !== undefined) {
      this.updateRemainingTime(min);
    }

    this.applyBtnStyle();
  };

  updateContext = (pomodoroTimer, shortBreak, longBreak) => {
    this.setState({ pomodoroTimer, shortBreak, longBreak });
  };

  reduceRemainingTime = () => {
    this.setState((prevState) => {
      const newRemainingTime = prevState.remainingTime.minus({ seconds: 1 });

      if (newRemainingTime.as("seconds") <= 0) {
        this.timerEndSound();

        if (prevState.currentTimer === "pomodoro") {
          const newPomodoroCount = prevState.pomodoroCount + 1;
          const nextTimerType =
            prevState.pomodoroCount % 4 === 0 ? "long-break" : "short-break";
          const nextDuration =
            prevState.pomodoroCount % 4 === 0
              ? this.state.longBreak
              : this.state.shortBreak;

          return {
            pomodoroCount: newPomodoroCount,
            currentTimer: nextTimerType,
            remainingTime: Duration.fromObject({ minutes: nextDuration }),
            currentStatus: "start", // Automatically start the next timer
          };
        } else {
          return {
            currentTimer: "pomodoro",
            remainingTime: Duration.fromObject({
              minutes: this.state.pomodoroTimer,
            }),
            currentStatus: "start", // Automatically start the next Pomodoro
          };
        }
      }

      return { remainingTime: newRemainingTime };
    });
  };

  updateRemainingTime = (int) => {
    this.setState({ remainingTime: Duration.fromObject({ minutes: int }) });
  };

  render() {
    return (
      <TimerContext.Provider
        value={{
          pomodoroTimer: this.state.pomodoroTimer,
          remainingTime: this.state.remainingTime,
          shortBreak: this.state.shortBreak,
          longBreak: this.state.longBreak,
          pomodoroCount: this.state.pomodoroCount,
          currentStatus: this.state.currentStatus,
          currentTimer: this.state.currentTimer,
          handleBtnClick: this.handleBtnClick,
          updateContext: this.updateContext,
        }}
      >
        <div className="container pomodoro-section border p-3">
          <NavBar />
          <IntervalControllers />
          <Clock />
          <InitiatorBtn />
          <PomodoroCountDisplay />
        </div>
      </TimerContext.Provider>
    );
  }
}

export default App;
