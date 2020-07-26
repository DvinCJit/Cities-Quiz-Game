import React, { Component } from "react";
import history from "../history";
import api from "../api";

class StartGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleClick = async () => {
    const name = this.state;
    await api.startgame(name).then((play) => {
      window.localStorage.setItem("play", JSON.stringify(play));
      this.setState({ value: "" });
      history.push("/cities-quiz");
      window.location.reload();
    });
  };

  render() {
    return (
      <div className="startgame">
        <div className="start-container">
          <header className="App-header">
            <h1 className="startHeader rainbow"> Cities Quiz</h1>
          </header>
          <div className="text-container">
            <h2 className="insert-name fadeDown">Insert your name</h2>
            <input
              className="input-name"
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
            <button className="play-btn btn" onClick={this.handleClick}>
              Play
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default StartGame;
