import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Buscador.css";
import { addMovieFavorite, getMovies } from "../../actions";

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      mostrar: false,
      bloquearFav: false,
    };
  }
  handleChange(event) {
    this.setState({ ...this.state, title: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.getMovies(this.state.title);
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <div className="contenedor">
          <h2 style={{ color: "white" }}> QUE PELICULA ESTAS BUSCANDO?</h2>
          <form
            className="form-container"
            onSubmit={(e) => {
              this.handleSubmit(e);
              this.setState({ ...this.state, mostrar: true });
            }}
          >
            <div>
              <input
                className="inputBuscador"
                type="text"
                id="title"
                autoComplete="off"
                value={title}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <button className="botonBuscador" type="submit">
              BUSCAR
            </button>
          </form>
        </div>
        {this.state.mostrar && (
          <ul className="ulBusqueda">
            {this.props.movies &&
              this.props.movies.map((movie) => (
                <div key={movie.imdbID}>
                  <img
                    className="imgBuscador"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                  <Link to={`/movie/${movie.imdbID}`}>
                    <li style={{ color: "white" }}>{movie.Title}</li>
                  </Link>
                  <button
                    className="botonFavoritos"
                    onClick={() => {
                      this.props.addMovieFavorite({
                        title: movie.Title,
                        id: movie.imdbID,
                        Poster: movie.Poster,
                      });
                      this.setState({ ...this.state, bloquearFav: true });
                    }}
                  >
                    Add Favorite
                  </button>
                </div>
              ))}
          </ul>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    getMovies: (title) => dispatch(getMovies(title)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);
