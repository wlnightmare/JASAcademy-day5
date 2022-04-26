import { Container, Pagination, Stack } from '@mui/material';
import React, { useCallback } from 'react'
import { useEffect } from "react";
import { CharacterCard } from '../components/rickAndMorty/CharacterCard';
import { FilterStatus } from '../components/rickAndMorty/FilterStatus';
import { Searching } from '../components/rickAndMorty/Searching';
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../store/actions/fetchCharacters';

export function RickAndMortyPage() {
    const pages = useSelector((state)=> state.characters.pages)
    const characters = useSelector((state)=> state.characters.characters)
    const search = useSelector((state)=> state.characters.search)
    const sortBy = useSelector((state)=> state.characters.sortBy)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCharacters())
    },[dispatch])

    const setSortBy = useCallback((payload) => {
        dispatch({ type: 'characters/sortBy', payload })
    }, [dispatch])

    const setSearch = useCallback((payload) => {
        dispatch({ type: 'characters/search', payload })
    }, [dispatch])

    const searchCharacters = useCallback(({pages = 1, sort = sortBy} = {}) => {
        dispatch(fetchCharacters({ pages, sort, search }))
    }, [dispatch, search, sortBy])


  return (
      <Container maxWidth="xl">
        <div style={{display:'flex', alignItems:'center'}}>
            <h1>Rick And Morty Forever</h1>
            <div style={{marginLeft:'auto', flexGrow: 1, maxWidth:'300px'}}>
            <div style={{text:'center'}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortBy}
                        disabled={search || search.length > 0}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            searchCharacters({ sort: e.target.value })
                        }}
                        label="Sort By"
                        size="small"
                    >
                        <MenuItem value="Alive">Alive</MenuItem>
                        <MenuItem value="Dead">Dead</MenuItem>
                        <MenuItem value="unknown">Unknown</MenuItem>
                    </Select>
             </FormControl>
            </div>
                {/* <FilterStatus sortBy={sortBy} setSortBy={setSortBy} search={search}/> */}
        </div>
            <div style={{marginLeft:'5px'}}>
                <Searching search={search} setSearch={setSearch} searchCharacters={searchCharacters}/>
            </div>
        </div>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:'36px 0px', backgroundColor:'rgb(36, 40, 47)'}}>
            <CharacterCard characters={characters}/>
        </div>
        
        <Stack spacing={2}>
            <Pagination count={pages.total_pages} onChange={(event, value)=>searchCharacters({page:value})}/>
        </Stack>
      </Container>
    
  )
}
