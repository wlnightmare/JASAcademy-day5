import React from 'react'
import { Container, Grid, styled } from '@mui/material'

// const Box = styled('div')`
//     width: 100
//     img {
//         width: 100%;
//         height: 300px;
//     }
// `

export const CharacterCard = ({characters}) => {
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap', width:'100%'}}>
        <Grid container spacing={2}>
            {characters.map((character) => (
                <Grid item xs={4} key={character.id}>
                    <div style={{ width:'660px', height:'220px',display:'flex', margin:'12px', borderRadius:'8px',overflow:'hidden'}}>
                            <div style={{width:'100%', flex:'2 1 0%'}}>
                            <img style={{width:'100%', height:'100%', objectPosition:'center center', objectFit:'cover'}} 
                            src={character.image} alt={character.name}/>
                            </div>
                        <div style={{flex:'3 1 0%', position:'relative', padding:'12px', display:'flex', flexDirection:'column'}}>
                            <div style={{flex:'1 1 0%', display:'flex', flexDirection:'column' }}>
                                <a style={{fontSize:'16px', fontWeight:'bold', marginBottom:'4px'}}>{character.name}</a>
                                <span>{character.status}-{character.species}</span>
                            </div>
                            <div>
                                <span style={{fontSize: '14px'}}>Last location</span>
                                <a style={{fontSize: '12px'}}>{character.location.name}</a>
                            </div>
                            <div>
                                <span>First seen in:</span>
                                <a>{character.origin.name}</a>
                            </div>
                        </div>
                    </div>   
                </Grid>
            ))}
        </Grid>
    </div>
  )
}
