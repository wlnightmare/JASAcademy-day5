import { useEffect, useState } from "react";
import { Container, Grid, Button } from "@mui/material";
import { MovieItem } from "../components/MovieItem";

export function MoviesPage() {
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        getDefaultValues()
    }, [])


    function getDefaultValues() {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results)
            })
    }

    function getSearchValue() {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&page=1&include_adult=false&query=${query}`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results)
            })
    }

    return (
        <Container maxWidth="xl">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    style={{ marginLeft: 'auto' }}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Type to search"
                ></input>

                <Button onClick={getSearchValue}>🔍</Button>
            </div>
            <h1>Movies</h1>
            <Grid container spacing={2}>
                {movies.map((movie) => (
                    <Grid item xs={12 / 5} key={movie.id}>
                        <MovieItem movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Container >
    )
}