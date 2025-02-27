import React, { useContext, useRef, useState } from "react";
import TimerContext from "../context/timerContext";

const NavBar = () => {
  const context = useContext(TimerContext);
  const [pomodoro, setPomodoro] = useState(context.pomodoroTimer);
  const [shortBreak, setShortBreak] = useState(context.shortBreak);
  const [longBreak, setLongBreak] = useState(context.longBreak);

  const dialogRef = useRef(null);

  const showSettings = () => {
    dialogRef.current.showModal();
  };

  const closeModal = () => {
    dialogRef.current.close();
  };

  const handleChange = (e) => {
    const type = e.target.id;
    const value = e.target.value;
    switch (type) {
      case "pomodoro":
        setPomodoro(value);
        break;
      case "short-break":
        setShortBreak(value);
        break;
      case "long-break":
        setLongBreak(value);
        break;
    }
  };

  const handleSave = () => {
    context.updateContext(pomodoro,shortBreak,longBreak)
    closeModal()
  };

  return (
    <div className="container my-3">
      <div className="row align-items-center">
        <div className="col text-start">
          <h6>Hamed's Pomodoro</h6>
        </div>
        <div className="col text-end">
          <button onClick={showSettings} className="btn">
            <i className="fa-solid fa-gear"></i> Settings
          </button>
        </div>
      </div>
      <dialog ref={dialogRef}>
        <div className="container">
          <div className="row">
            <h4>Settings</h4>
            <form className="form mt-3">
              <legend className="form-legend">Time (minutes)</legend>
              <div className="mt-2 row form-group align-items-center">
                <label htmlFor="pomodoro-input" className="form-label col-3">
                  Pomodoro:
                </label>
                <div className="col-6">
                  <input
                    id="pomodoro"
                    onChange={handleChange}
                    value={pomodoro}
                    type="number"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mt-2 row form-group align-items-center">
                <label htmlFor="pomodoro-input" className="form-label col-3">
                  Short Break:
                </label>
                <div className="col-6">
                  <input
                    id="short-break"
                    onChange={handleChange}
                    value={shortBreak}
                    type="number"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mt-2 row form-group align-items-center">
                <label htmlFor="pomodoro-input" className="form-label col-3">
                  Long Break:
                </label>
                <div className="col-6">
                  <input
                    id="long-break"
                    onChange={handleChange}
                    value={longBreak}
                    type="number"
                    className="form-control"
                  />
                </div>
              </div>
            </form>
            <div className="container mt-3">
              <div className="row justify-content-evenly">
                <div className="col-4">
                  {" "}
                  <button style={{width:"100%"}} onClick={closeModal} className="btn btn-danger">
                    Close
                  </button>
                </div>
                <div className="col-4">
                  <button style={{width:"100%"}} onClick={handleSave} className="btn btn-success">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NavBar;
