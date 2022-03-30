import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Button, Stack, Pagination, FormHelperText } from "@mui/material";
import { MovieItem } from "../components/MovieItem";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';


export function MoviesPage() {
    const [sortBy, setSortBy] = useState("popularity.desc")
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState("")
    const [pageInfo, setPageInfo] = useState({
        page: 1,
        total_pages: 0,
    })

    useEffect(() => {
        getSearchValue()
    }, [])


    function getSearchValue({ page = 1, sort = sortBy } = {}) {
        let method = 'discover'
        if (query && query.length > 0) {
            method = 'search'
        }
        fetch(`https://api.themoviedb.org/3/${method}/movie?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&sort_by=${sortBy}&include_adult=false&include_video=true&page=${page}&with_watch_monetization_types=flatrate&query=${query}`)
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
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortBy}
                        disabled={query || query.length > 0}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            getSearchValue({ sort: e.target.value })
                        }}
                        label="Sort By"
                        size="small"
                    >
                        <MenuItem value="popularity.desc">Popularity</MenuItem>
                        <MenuItem value="release_date.desc">Release Date</MenuItem>
                        <MenuItem value="vote_average.desc">Rating</MenuItem>
                    </Select>
                </FormControl>
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