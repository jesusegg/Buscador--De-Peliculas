import React from "react";
import { connect } from "react-redux";
import { getMovieDetail } from "../../actions/index";

import "./Movie.css";

class Movie extends React.Component {
  componentDidMount() {
    const movieId = this.props.match.params.id;
    this.props.getMovieDetail(movieId);
  }

  render() {
    return (
      <div className="container">
        <div className="details">
          <div className="title">
            <h1>{this.props.detalles.Title}</h1>{" "}
            <span>{this.props.detalles.Rated}</span>
          </div>
          <p className="año">{this.props.detalles.Year}</p>
          <p className="description">{this.props.detalles.Plot}</p>
          <div className="container2 ">
            <img
              className="img"
              src={this.props.detalles.Poster}
              alt={this.props.detalles.Title}
            ></img>
            <ul className="column">
              <li>Director: {this.props.detalles.Director}</li>
              <li>BoxOffice: {this.props.detalles.BoxOffice}</li>
              <li>imdbRating: {this.props.detalles.imdbRating}</li>
              <li>Genero: {this.props.detalles.Genre}</li>
              <li>Premios: {this.props.detalles.Awards}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    detalles: state.movieDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMovieDetail: (id) => dispatch(getMovieDetail(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
