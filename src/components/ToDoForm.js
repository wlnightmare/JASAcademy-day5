import { Button, TextField } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'

export function TodoForm({onCreate}) {
  const [text, setText] = useState("")

  const handleCreate = useCallback((e) => {
    e.preventDefault()
    onCreate({
        text,
        created: new Date(),
        done: false,
    })
    setText('')
  }, [onCreate, text])

  const isDisabled = useMemo(() => {
    return text.trim().length === 0
  }, [text])
  

  return (
    <form onSubmit={handleCreate}>
      <TextField label="Name" value={text}
       style={{width:'410px', margin:'33px 20px 40px 35px',background:'#E5E5E5'}} 
       onChange={(e) => setText(e.target.value)} />
      <Button 
      style={{margin:'33px 0 40px 20px', color:'white', background:'#5162FF'}}
      type="submit" 
      disabled={isDisabled}
      > 
        Create
      </Button>
    </form>
  )
}
