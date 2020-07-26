import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import api from "../api";
import history from "../history";

mapboxgl.accessToken =
  "pk.eyJ1IjoianVkaXRocm4iLCJhIjoiY2pqZWZhaWh5Mm83ZjNxbW14YjYwY3BvdSJ9.dzLHt6jQRGlNH9jFAdhkbg";

class GameScreen extends Component {
  constructor(props) {
    super(props);
    // this.handleClose = this.handleClose.bind(this);
    this.state = {
      result: "",
      modalText: "",
      play: [],
      highScore: 0,
      lat: 49.541342,
      lng: 11.507795,
      zoom: 3.5,
      currentCoords: {},
      modalClass: "modal fade",
    };
  }

  componentDidMount = () => {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/judithrn/ckd0gl8210h161in8g3guwz60",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });

    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([this.state.lng, this.state.lat])
      .addTo(map);

    this.setState({ currentCoords: marker.getLngLat() });
    const onDragEnd = () => {
      const lngLat = marker.getLngLat();
      this.setState({ currentCoords: lngLat });
    };

    marker.on("dragend", onDragEnd);

    const data = window.localStorage.getItem("play");
    const obj = JSON.parse(data);
    console.log(obj.data);
    this.setState({ play: obj.data });
  };

  handlePlaceCity = async (e) => {
    e.preventDefault();
    const data = window.localStorage.getItem("play");
    const obj = JSON.parse(data);
    const _id = obj.data._id;
    await api.placeCity([this.state.currentCoords, _id]).then((data) => {
      console.log(data.data);
      this.setState({ play: data.data });
    });

    if (this.state.play.km_left <= 0) {
      this.setState({ result: "Game Over" });
      this.setState({ modalText: "You run out of kilometres!" });
      this.fetchHighScore();
      this.setState({ modalClass: "modal-visible fade" });
    } else if (
      this.state.play.placed_cities.length === 8 &&
      this.state.play.score !== 9
    ) {
      this.setState({ result: "Game Over" });
      this.setState({ modalText: "Those were all the cities!" });
      this.fetchHighScore();
      this.setState({ modalClass: "modal-visible fade" });
    } else if (this.state.score === 9) {
      this.setState({ result: "You Win!" });
      this.setState({ modalText: "You placed all the cities correctly!" });
      this.fetchHighScore();
      this.setState({ modalClass: "modal-visible fade" });
    }
  };

  fetchHighScore = async () => {
    await api.getHighScore().then((data) => {
      console.log(data.data[0].score);
      this.setState({ highScore: data.data[0].score });
    });
  };

  // handleClose = () => {
  //   this.setState({ modalClass: "modal fade" });
  // };

  handlePlayAgain = () => {
    history.push("/");
    window.location.reload();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="gameHeader"> Cities Quiz</h1>
          <p className="info">Drag marker</p>
        </header>
        <div className="scoreboard">
          <p className="scoreboard-text">
            City: {this.state.play ? this.state.play.current_city : ""}
          </p>
          <p className="scoreboard-text">
            Score: {this.state.play ? this.state.play.score : 0}
          </p>
          <p className="scoreboard-text">
            Km: {this.state.play ? this.state.play.km_left : 1500}
          </p>
        </div>

        <div
          ref={(el) => (this.mapContainer = el)}
          className="mapContainer"
          onClick={this.handleClick}
        />
        <button className="place-city btn" onClick={this.handlePlaceCity}>
          Place City
        </button>

        <div className={this.state.modalClass} id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  onClick={this.handlePlayAgain}
                  className="close-button btn"
                >
                  &times;
                </button>
                <h3 className="modal-title">{this.state.result}</h3>
              </div>
              <div className="modal-body">
                <p>{this.state.modalText}</p>
                <p>High Score: {this.state.highScore}</p>
                <p>Your Score: {this.state.play.score} </p>
              </div>
              <div className="modal-footer">
                <button
                  className="play-button btn"
                  onClick={this.handlePlayAgain}
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameScreen;
