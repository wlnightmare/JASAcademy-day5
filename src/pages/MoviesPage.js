import { useEffect, useState } from "react";
import { Container, Grid, Button, Stack, Pagination } from "@mui/material";
import { MovieItem } from "../components/MovieItem";

export function MoviesPage() {

    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState("")
    const [pageInfo, setPageInfo] = useState({
        page: 1,
        total_pages: 0,
    })

    useEffect(() => {
        getSearchValue()
    }, [])


    function getSearchValue(page = 1) {
        let method = 'discover'
        if (query && query.length > 0) {
            method = 'search'
        }
        fetch(`https://api.themoviedb.org/3/${method}/movie?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_watch_monetization_types=flatrate&query=${query}`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results)
                setPageInfo({
                    page: data.page,
                    total_pages: Math.min(data.total_pages, 500)
                })
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

                <Button onClick={() => getSearchValue()}>🔍</Button>
            </div>
            <h1>Movies</h1>
            <Grid container spacing={2}>
                {movies.map((movie) => (
                    <Grid item xs={12 / 5} key={movie.id}>
                        <MovieItem movie={movie} />
                    </Grid>
                ))}
            </Grid>
            <Stack spacing={2}>
                <Pagination count={pageInfo.total_pages} page={pageInfo.page} onChange={(event, value) => getSearchValue(value)} color="primary" />
            </Stack>
        </Container >
    )
}