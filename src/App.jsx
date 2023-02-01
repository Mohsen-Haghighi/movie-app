import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=d7b9dbad';


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search)
    }
    useEffect(() => {
        searchMovies('')
    },[])
    return (
        <div className="app">
            <h1>MovieBox</h1>

            <div className="search">
                <input
                    placeholder="Search the Movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0 
                ?   (
                        <div className="container">
                            { movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ) )}
                        </div>
                    )
                : 
                    (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )


            }
        </div>
    )
}

export default App;