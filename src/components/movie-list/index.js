import React, { Component } from "react";
import "./index.css";



export default class MovieList extends Component {
  constructor(props) {
    super();
    this.state = {
      movieData: {},
      initial: true,
    }
  }


  render() {

    const queryMoviesByYear = () => {
      const year = this.textInput.value;
      const apiUrl =`https://jsonmock.hackerrank.com/api/movies?Year=${year}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => this.setState({movieData: data.data, initial: false, qy: year}));
    }

    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input type="number" className="large" placeholder="Enter Year eg 2015" data-testid="app-input" ref={(input) => this.textInput = input}  />
          <button className="" data-testid="submit-button" onClick={queryMoviesByYear} >Search</button>
        </section>
        <ul className="mt-50 styled" data-testid="movieList">
          {Object.keys(this.state.movieData).length > 0 ? (
            Object.values(this.state.movieData).map((movie) => {
                  const movieTitle = movie.Title;
                  return (
                    <li key={movieTitle} data-testid="app-title" className="slide-up-fade-in py-10">{movieTitle}</li>
                  )
            })
          ) : (
            ''
          )}
        </ul>
         {Object.keys(this.state.movieData).length === 0 && this.state.initial === false ? (
           <div  data-testid="no-result">No Results Found</div>
         ): ''
         }
      </div>
    );
  }
}
