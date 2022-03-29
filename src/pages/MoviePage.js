import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { styled, Container, Grid } from "@mui/material"
import { getGenres } from "../utils/getGenres";
import { getStartsByRating } from "../utils/getStartsByRating";


const Box = styled('div')`
  width: 100%;
  height: 440px;
  background-image: ${(props) => `url("https://image.tmdb.org/t/p/original/${props.imageurl}");`}
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  padding: 24px;
  box-sizing: border-box;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 80.79%);
  }
  color: white;
`
const Box1 = styled('div')`
  width: 292px;
  height: 440px;
  background-image: ${(props) => `url("https://image.tmdb.org/t/p/original/${props.imageurl}");`}
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  padding: 24px;
  box-sizing: border-box;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 80.79%);
  }
  color: white;
`

const Title = styled('span')`
  font-weight: 500;
  font-size: 56px;
  z-index: 1;
`
const Stars = styled('div')`
  z-index: 1;
  font-size: 12px;
  margin-bottom: 18px;
  position: relative;
`
const Genre = styled('div')`
  z-index: 1;
  font-size: 14px;
  position: relative;
`
const Overview = styled('div')`
  z-index: 1;
    position: relative;
    bottom:0;
`


export function MoviePage() {

    const navigate = useNavigate()
    const params = useParams()
    const [films, setFilms] = useState([])
    const [sameFilms, setSameFilms] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU`)
            .then((res) => res.json())
            .then((data) => {
                setFilms(data)
            })

        getSimilarFilms()
    }, [params.id])

    function getSimilarFilms() {
        fetch(`https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setSameFilms(data.results)
            })
    }

    return (
        <Container>
            <Box imageurl={films.backdrop_path}>
                <Title>
                    {films && films.title}
                </Title>
                <Stars>
                    {getStartsByRating(films.vote_average)}
                </Stars>
                <Genre>
                    {films.genres && films.genres.slice(0, 5).map((genre, i) => <span key={i} style={{ padding: '5px' }}>{genre.name}</span>)}
                </Genre>
                <Overview>
                    {films.overview}
                </Overview>

            </Box>
            <h2>Similar Movies</h2>
            <div>
                {sameFilms.map((movie) => (
                    <Grid item xs={12 / 5} key={movie.id}>
                        <Box1 imageurl={movie.poster_path} onClick={() => navigate('/movies/' + movie.id)}>
                            <Title>{movie.title}</Title>
                            <Stars>
                                {getStartsByRating(movie.vote_average)}
                            </Stars>
                            <Genre>
                                {getGenres(movie.genre_ids)}
                            </Genre>
                        </Box1>
                    </Grid>
                ))}
            </div>

        </Container>



    )
}