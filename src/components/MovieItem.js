import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../utils/getGenres";
import { getStartsByRating } from "../utils/getStartsByRating";

const Box = styled('div')`
  width: 100%;
  height: 440px;
  background-image: ${(props) => `url("https://image.tmdb.org/t/p/original${props.imageurl}");`}
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
  font-size: 24px;
  z-index: 1;
`
const Stars = styled('div')`
  z-index: 1;
  font-size: 12px;
  margin-bottom: 16px;
`
const Genre = styled('div')`
  z-index: 1;
  font-size: 14px;
`


export function MovieItem({ movie }) {
  const navigate = useNavigate()
  return (
    <Box imageurl={movie.poster_path} onClick={() => navigate('/movies/' + movie.id)}>
      <Title>{movie.title}</Title>
      <Stars>
        {getStartsByRating(movie.vote_average)}
      </Stars>
      <Genre>
        {getGenres(movie.genre_ids)}
      </Genre>
    </Box>
  )
}