import React from 'react'
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material'

export const FilterStatus = (search, sortBy, setSortBy, getValues) => {
  return (
    <div>
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
                            getValues({ sort: e.target.value })
                        }}
                        label="Sort By"
                        size="small"
                    >
                        <MenuItem value="alive">Alive</MenuItem>
                        <MenuItem value="dead">Dead</MenuItem>
                        <MenuItem value="unknown">Unknown</MenuItem>
                    </Select>
             </FormControl>
        </div>
    </div>
  )
}
