import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Favorites.css";
import { removeMovieFavorite } from "../../actions";

export class ConnectedList extends Component {
  render() {
    return (
      <div>
        <h2 className="titulosFavoritos">Películas Favoritas</h2>
        <ul className="ulBusqueda">
          {this.props.moviesFav &&
            this.props.moviesFav.map((movie) => (
              <div key={movie.title}>
                <img
                  className="imgBuscador"
                  src={movie.Poster}
                  alt={movie.Title}
                />
                <Link to={`/movie/${movie.id}`}>
                  <li style={{ color: "white" }}>{movie.title}</li>
                </Link>
                <button
                  className="botonFavoritos color"
                  onClick={() =>
                    this.props.removeMovieFavorite({
                      id: movie.id,
                    })
                  }
                >
                  REMOVE
                </button>
              </div>
            ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    moviesFav: state.moviesFavourites,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeMovieFavorite: (movie) => dispatch(removeMovieFavorite(movie)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
