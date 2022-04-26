import { useCallback, useEffect } from "react";
import { Container, Grid, Button, Stack, Pagination } from "@mui/material";
import { MovieItem } from "../components/MovieItem";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from "react-redux";
import {fetchMovies, SET_MOVIES_QUERY, SET_MOVIES_SORT_BY} from "../store/actions/fetchMovies";


export function MoviesPage() {
    const sortBy = useSelector((state) => state.movies.sortBy)
    const movies = useSelector((state)=> state.movies.movies)
    const query = useSelector((state)=>state.movies.query)
    const pageInfo = useSelector((state)=> state.movies.pageInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMovies())
    }, [dispatch])

    const setSortBy = useCallback((payload) => {
        dispatch({ type: SET_MOVIES_SORT_BY, payload })
    }, [dispatch])
    const setQuery = useCallback((payload) => {
        dispatch({ type: SET_MOVIES_QUERY, payload })
    }, [dispatch])
    const searchMovies = useCallback(({page = 1, sort = sortBy} = {}) => {
        dispatch(fetchMovies({ page, sort, query }))
    }, [dispatch, query, sortBy])

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
                            searchMovies({ sort: e.target.value })
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

                <Button onClick={() => searchMovies()}>🔍</Button>
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
                <Pagination count={pageInfo.total_pages} page={pageInfo.page} onChange={(event, value) => searchMovies(value)} color="primary" />
            </Stack>
        </Container >
    )
}