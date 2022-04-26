import React from 'react'

export const Searching = ({ search, setSearch, searchCharacters}) => {
  return (
    <div>
        <form style={{display:'flex', justifyContent:'center', gap:'4px', marginBottom:'5px'}}>
            <input style={{width:'70%', borderRadius:'8px', border:'2px solid blue', padding:'10px 10px'}}
            onChange={(event)=>{
                searchCharacters(1);
                setSearch(event.target.value)
            }}
            placeholder="Search for Character" 
            type="text"
            value={search}
            />
            <button onClick={(event)=>event.preventDefault()}>Search</button>
        </form>
    </div>
  )
}
